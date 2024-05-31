import { useContractRead, UseContractReadResult } from '@starknet-react/core'
import { useMemo } from 'react'
import { compiledBoard } from 'src/constants/contracts'
import { BlockTag, num, shortString } from 'starknet'

// State

interface BoardState {
  playersNameAddrMap: Record<string, string>
  round: number
  players: PlayerState[]
}

export interface PlayerState {
  points: number
  name: string
  address: string
  exposedStealing: ExposedBehaviour
  exposedGiving: ExposedBehaviour
}

interface ExposedBehaviour {
  count: number
  exposer: string | null
}

// Raw State

interface RawBoardState {
  round: bigint
  players: RawPlayerState[]
}

interface RawPlayerState {
  name: bigint
  address: bigint
  points: bigint
  exposed_stealing: RawExposedBehaviour
  exposed_giving: RawExposedBehaviour
}

interface RawExposedBehaviour {
  count: bigint
  exposer: bigint
}

// Use Board

interface UseBoardResponse {
  error: boolean
  board?: BoardState
}

export default function useBoard(address?: string): UseBoardResponse {
  // fetch state
  const res = useContractRead({
    blockIdentifier: BlockTag.pending,
    abi: compiledBoard, // call is not send if abi is undefined
    address,
    functionName: 'board_state',
    args: [],
  }) as UseContractReadResult & { data: RawBoardState }

  // parse state
  const board = useMemo(() => {
    if (!res.data) return undefined

    // create an addr -> name mapping
    const addressToNameMap = res.data.players.reduce<Record<string, string>>((acc, rawPlayer) => {
      acc[num.toHex(rawPlayer.address)] = shortString.decodeShortString(num.toHex(rawPlayer.name))

      return acc
    }, {})

    const nameToAddressMap = res.data.players.reduce<Record<string, string>>((acc, rawPlayer) => {
      acc[shortString.decodeShortString(num.toHex(rawPlayer.name))] = num.toHex(rawPlayer.address)

      return acc
    }, {})

    return {
      playersNameAddrMap: nameToAddressMap,
      round: Number(res.data.round),
      players: res.data.players.map((rawPlayer): PlayerState => {
        const address = num.toHex(rawPlayer.address)
        const name = addressToNameMap[address]

        const stealingExposerAddress = num.toHex(rawPlayer.exposed_stealing.exposer)
        const stealingExposerName = addressToNameMap[stealingExposerAddress] ?? null

        const givingExposerAddress = num.toHex(rawPlayer.exposed_giving.exposer)
        const givingExposerName = addressToNameMap[givingExposerAddress] ?? null

        return {
          points: Number(rawPlayer.points),
          name,
          address,
          exposedStealing: {
            count: Number(rawPlayer.exposed_stealing.count),
            exposer: stealingExposerName,
          },
          exposedGiving: {
            count: Number(rawPlayer.exposed_giving.count),
            exposer: givingExposerName,
          },
        }
      }),
    }
  }, [res.data])

  console.log(res.data)

  // is failed
  const error = useMemo(() => !!res.error || !address, [address, res.error])

  return { error, board }
}
