import { Link } from 'react-router-dom'
import { Row } from 'src/components/Flex'
import Web3Status from 'src/components/Web3Status'
import * as Icons from 'src/theme/components/icons'
import { styled } from 'styled-components'

const StyledHeader = styled(Row)`
  position: sticky;
  z-index: 1000;
  padding: 16px 24px;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`

const Logo = styled(Icons.Logo)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.neutral1};
`

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <Web3Status />
    </StyledHeader>
  )
}
