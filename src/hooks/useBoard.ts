import { isValidL2Address } from 'src/utils/address'

interface BoardState {
  round: number
  players: PlayerState[]
}

interface PlayerState {
  points: number
  name: string
  exposedStealing: ExposedBehaviour
  exposedGiving: ExposedBehaviour
}

interface ExposedBehaviour {
  count: number
  exposer: string
}

interface UseBoardResponse {
  error: boolean
  board?: BoardState
}

export default function useBoard(address?: string): UseBoardResponse {
  if (!address || !isValidL2Address(address)) return { error: true }

  return {
    error: false,
    board: {
      round: 0,
      players: [],
    },
  }
}
