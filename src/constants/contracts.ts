import Board from 'src/contracts/Board.json'
import { json } from 'starknet'

export const compiledBoard = json.parse(JSON.stringify(Board.abi))
