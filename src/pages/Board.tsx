import { useParams } from 'react-router-dom'
import useBoard from 'src/hooks/useBoard'
import { ThemedText } from 'src/theme/components'
import { styled } from 'styled-components'

const StyledBoardPage = styled.div`
  display: grid;
`

const Player = styled.div`
  width: 200px;
`

export default function BoardPage() {
  // URL
  const { address: boardAddress } = useParams()

  const { error, board } = useBoard(boardAddress)

  if (error) {
    return (
      <ThemedText.HeadlineMedium textAlign="center" marginTop={100} color="error">
        Invalid Board.
      </ThemedText.HeadlineMedium>
    )
  }

  // loading
  if (!board) {
    return (
      <ThemedText.HeadlineMedium textAlign="center" marginTop={100}>
        Loading Board...
      </ThemedText.HeadlineMedium>
    )
  }

  return (
    <StyledBoardPage>
      {board.players.map((player) => (
        <Player key={player.name}>
          <ThemedText.BodyPrimary>{player.name}</ThemedText.BodyPrimary>
        </Player>
      ))}
    </StyledBoardPage>
  )
}
