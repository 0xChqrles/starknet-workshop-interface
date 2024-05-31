import { ThemedText } from 'src/theme/components'
import * as Icons from 'src/theme/components/icons'
import { styled } from 'styled-components'

import { Column, Row } from '../Flex'

const StyledContent = styled.div`
  @media only screen and (min-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    padding: 32px;
    top: 50%;
    left: 50%;
    width: 480px;
    transform: translate(-50%, -50%);
    bottom: unset;
  }

  border: solid 1px ${({ theme }) => theme.border1};
  border-radius: 10px;
  background: ${({ theme }) => theme.bg1};
  z-index: 1000;
  position: fixed;
  bottom: 0;
  top: 0;
  padding: 32px 88px;
  width: 100%;
`

const Title = styled(ThemedText.HeadlineSmall)`
  font-size: 32px !important;

  @media only screen and (min-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    font-size: 24px !important;
  }
`

const CloseContainer = styled.div`
  color: ${({ theme }) => theme.neutral1};
  width: 24px;
  height: 24px;
  cursor: pointer;
`

interface ContentProps {
  title: string
  close: () => void
}

export default function Content({ children, title, close }: React.PropsWithChildren<ContentProps>) {
  return (
    <StyledContent>
      <Column gap={42} alignItems="normal">
        <Row justify="space-between">
          <Title>{title}</Title>

          <CloseContainer>
            <Icons.Close onClick={close} />
          </CloseContainer>
        </Row>

        {children}
      </Column>
    </StyledContent>
  )
}
