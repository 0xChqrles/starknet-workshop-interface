import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from 'src/components/Button'
import { Column, Row } from 'src/components/Flex'
import Input from 'src/components/Input'
import { isValidL2Address } from 'src/utils/address'
import { styled } from 'styled-components'

const Container = styled(Column)`
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  gap: 16px;
  height: 80vh;
`

const BoardInput = styled(Input)`
  width: 300px;
`

const Join = styled(PrimaryButton)`
  width: 150px;
`

export default function HomePage() {
  const [boardAddress, setBoardAddress] = useState('')

  // navigation
  const navigate = useNavigate()
  const openBoard = useCallback(() => {
    navigate(`/board/${boardAddress}`)
  }, [navigate, boardAddress])

  const isBoardAddressValid = useMemo(() => isValidL2Address(boardAddress), [boardAddress])

  return (
    <Container>
      <Row gap={16}>
        <BoardInput onUserInput={setBoardAddress} placeholder="Board address" />
        <Join onClick={openBoard} disabled={!isBoardAddressValid} large>
          Join !
        </Join>
      </Row>
    </Container>
  )
}
