import { useContractWrite } from '@starknet-react/core'
import { useMemo, useState } from 'react'
import { useCloseModal, usePlayerModal } from 'src/hooks/useModal'
import { ThemedText } from 'src/theme/components'
import { Call, shortString } from 'starknet'
import { styled } from 'styled-components'

import { PrimaryButton } from '../Button'
import Portal from '../common/Portal'
import { Column, Row } from '../Flex'
import Input from '../Input'
import Content from '../Modal/Content'
import Overlay from '../Modal/Overlay'

interface PlayerModalProps {
  playerAddress?: string
  playerName?: string
  playersNameAddrMap: Record<string, string>
}

const LOSING_STRATEGIES = ['None', 'Fight', 'Steal Back', 'Expose']
const RECEIVING_STRATEGIES = ['None', 'Split', 'Expose']
const ACTIONS = ['Give', 'Steal']

const Selectable = styled(ThemedText.HeadlineSmall)<{ selected: boolean }>`
  color: ${({ theme, selected }) => (selected ? theme.accent1 : theme.neutral2)};
  cursor: pointer;

  &:hover {
    color: ${({ theme, selected }) => (selected ? theme.accent1 : theme.neutral1)};
  }
`

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.neutral2};
  margin: 8px 0;
`

export default function PlayerModal({ playerAddress, playerName, playersNameAddrMap }: PlayerModalProps) {
  const [selectedLosingStrategy, setSelectedLosingStrategy] = useState(0)
  const [selectedReceivingStrategy, setSelectedReceivingStrategy] = useState(0)
  const [selectedNextAction, setSelectedNextAction] = useState(0)
  const [name, setName] = useState('')

  // can play
  const canPlay = useMemo(
    () => !!playersNameAddrMap[name] && name != playerName,
    [name, playerName, playersNameAddrMap]
  )

  // modal
  const [isOpen] = usePlayerModal()
  const close = useCloseModal()

  // calls
  const calls = useMemo((): Call[] => {
    return [
      {
        calldata: [selectedLosingStrategy],
        contractAddress: playerAddress ?? '',
        entrypoint: 'set_losing_strategy',
      },
      {
        calldata: [selectedReceivingStrategy],
        contractAddress: playerAddress ?? '',
        entrypoint: 'set_receiving_strategy',
      },
      {
        calldata: [shortString.encodeShortString(name)],
        contractAddress: playerAddress ?? '',
        entrypoint: ACTIONS[selectedNextAction].toLowerCase(),
      },
    ]
  }, [name, playerAddress, selectedLosingStrategy, selectedNextAction, selectedReceivingStrategy])

  const { writeAsync } = useContractWrite({ calls })

  if (!isOpen || !playerAddress || !playerName) return null

  return (
    <Portal>
      <Content title={playerName} close={close}>
        <Column gap={24} alignItems="normal">
          <Column gap={24} alignItems="normal">
            <ThemedText.HeadlineMedium>Losing strategy</ThemedText.HeadlineMedium>
            <Row justify="space-between">
              {LOSING_STRATEGIES.map((startegy, index) => (
                <Selectable
                  key={startegy}
                  selected={selectedLosingStrategy == index}
                  onClick={() => setSelectedLosingStrategy(index)}
                >
                  {startegy}
                </Selectable>
              ))}
            </Row>
          </Column>

          <Hr />

          <Column gap={24} alignItems="normal">
            <ThemedText.HeadlineMedium>Receiving strategy</ThemedText.HeadlineMedium>
            <Row justify="space-between">
              {RECEIVING_STRATEGIES.map((startegy, index) => (
                <Selectable
                  key={startegy}
                  selected={selectedReceivingStrategy == index}
                  onClick={() => setSelectedReceivingStrategy(index)}
                >
                  {startegy}
                </Selectable>
              ))}
            </Row>
          </Column>

          <Hr />

          <Column gap={24} alignItems="normal">
            <ThemedText.HeadlineMedium>Next Action</ThemedText.HeadlineMedium>

            <Row justify="space-around">
              {ACTIONS.map((startegy, index) => (
                <Selectable
                  key={startegy}
                  selected={selectedNextAction == index}
                  onClick={() => setSelectedNextAction(index)}
                >
                  {startegy}
                </Selectable>
              ))}
            </Row>

            <Input onUserInput={setName} placeholder="Name" />
          </Column>

          <PrimaryButton disabled={!canPlay} onClick={() => writeAsync()} large>
            Play !
          </PrimaryButton>
        </Column>
      </Content>

      <Overlay onClick={close} />
    </Portal>
  )
}
