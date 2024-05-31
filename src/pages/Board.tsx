import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Column, Row } from 'src/components/Flex'
import useBoard from 'src/hooks/useBoard'
import { ThemedText } from 'src/theme/components'
import * as Icons from 'src/theme/components/icons'
import { num } from 'starknet'
import { styled } from 'styled-components'

const StyledBoardPage = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(5, 1fr);
`

const Player = styled(Column)`
  width: 250px;
  max-width: 250px;
  gap: 16px;
  padding: 32px;
  background: ${({ theme }) => theme.bg2};
  border-radius: 16px;
`

const PlayerName = styled(ThemedText.HeadlineMedium)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  width: 100%;
`

const Character = styled(Icons.Character)<{ hue: number }>`
  width: 100px;
  filter: hue-rotate(${({ hue }) => hue}deg);
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

const Stats = styled(Column)`
  width: 100%;
  gap: 8px;
  align-items: normal;
`

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.neutral2};
  margin: 8px 0;
`

export default function BoardPage() {
  // URL
  const { address: boardAddress } = useParams()

  const { error, board } = useBoard(boardAddress)

  // characters variations
  const getHueRotation = useCallback((address: string): number => {
    return Number(num.toBigInt(address) % 360n) // Ensure the hue rotation is within 0-359 degrees
  }, [])

  // error
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
    <Column gap={64}>
      <ThemedText.HeadlineLarge textAlign="center" marginTop={100}>
        Round {board.round}
      </ThemedText.HeadlineLarge>

      <StyledBoardPage>
        {board.players.map((player) => (
          <Player key={player.name}>
            <PlayerName>{player.name}</PlayerName>

            <Character hue={getHueRotation(player.address)} />

            <Stats>
              <Row justify="space-between">
                <ThemedText.BodyPrimary>POINTS:</ThemedText.BodyPrimary>
                <ThemedText.BodyPrimary>{player.points}</ThemedText.BodyPrimary>
              </Row>

              <Hr />

              <Row justify="space-between">
                <ThemedText.BodyPrimary>GAVE:</ThemedText.BodyPrimary>
                <ThemedText.BodyPrimary>{player.exposedGiving.count}</ThemedText.BodyPrimary>
              </Row>

              {player.exposedGiving.exposer ? (
                <Row justify="space-between">
                  <ThemedText.BodyPrimary>EXPOSED BY:</ThemedText.BodyPrimary>
                  <ThemedText.BodyPrimary>{player.exposedGiving.exposer}</ThemedText.BodyPrimary>
                </Row>
              ) : (
                <ThemedText.BodyPrimary>-</ThemedText.BodyPrimary>
              )}

              <Hr />

              <Row justify="space-between">
                <ThemedText.BodyPrimary>STOLE:</ThemedText.BodyPrimary>
                <ThemedText.BodyPrimary>{player.exposedStealing.count}</ThemedText.BodyPrimary>
              </Row>

              {player.exposedStealing.exposer ? (
                <Row justify="space-between">
                  <ThemedText.BodyPrimary>EXPOSED BY:</ThemedText.BodyPrimary>
                  <ThemedText.BodyPrimary>{player.exposedStealing.exposer}</ThemedText.BodyPrimary>
                </Row>
              ) : (
                <ThemedText.BodyPrimary>-</ThemedText.BodyPrimary>
              )}
            </Stats>
          </Player>
        ))}
      </StyledBoardPage>
    </Column>
  )
}
