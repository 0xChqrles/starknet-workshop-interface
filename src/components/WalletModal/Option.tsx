import { Connector, useConnect } from '@starknet-react/core'
import { ThemedText } from 'src/theme/components/text'
import { styled } from 'styled-components'

import { Row } from '../Flex'

const StyledOption = styled(Row)`
  gap: 12px;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition-duration: 125ms;
  color: ${({ theme }) => theme.neutral1};

  &:hover {
    background: ${({ theme }) => theme.bg2};
  }
`

const SvgIcon = styled.div`
  width: 32px;
  height: 32px;
`

const ImgIcon = styled.img`
  width: 32px;
  height: 32px;
`

interface OptionProps {
  connection: Connector
  activate: () => void
}

function Option({ connection, activate }: OptionProps) {
  const icon = connection.icon.dark
  const isSvg = icon?.startsWith('<svg')

  return (
    <StyledOption onClick={activate}>
      {isSvg ? (
        <SvgIcon dangerouslySetInnerHTML={{ __html: icon ?? '' }} /> /* display svg */
      ) : (
        <ImgIcon src={connection.icon.dark} />
      )}
      <ThemedText.BodyPrimary>{connection.name}</ThemedText.BodyPrimary>
    </StyledOption>
  )
}

interface L2OptionProps {
  connection: Connector
}

export function L2Option({ connection }: L2OptionProps) {
  // wallet activation
  const { connect } = useConnect()
  const activate = () => connect({ connector: connection })

  return <Option connection={connection} activate={activate} />
}
