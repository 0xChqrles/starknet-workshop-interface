import { useCallback, useMemo, useState } from 'react'
import { useCloseModal, usePlayerModal } from 'src/hooks/useModal'
import { ThemedText } from 'src/theme/components'
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
  const [selectedLosingSelectable, setSelectedLosingSelectable] = useState(0)
  const [selectedReceivingSelectable, setSelectedReceivingSelectable] = useState(0)
  const [selectedNextAction, setSelectedNextAction] = useState(0)
  const [name, setName] = useState('')

  // can play
  const canPlay = useMemo(
    () => !!playersNameAddrMap[name] && name != playerName,
    [name, playerName, playersNameAddrMap]
  )

  // modal
  const [isOpen] = usePlayerModal()

  // modal
  const close = useCloseModal()

  const play = useCallback(() => {
    console.log('hey')
  }, [])

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
                  selected={selectedLosingSelectable == index}
                  onClick={() => setSelectedLosingSelectable(index)}
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
                  selected={selectedReceivingSelectable == index}
                  onClick={() => setSelectedReceivingSelectable(index)}
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

          <PrimaryButton disabled={!canPlay} onClick={play} large>
            Play !
          </PrimaryButton>
        </Column>
      </Content>

      <Overlay onClick={close} />
    </Portal>
  )
}
