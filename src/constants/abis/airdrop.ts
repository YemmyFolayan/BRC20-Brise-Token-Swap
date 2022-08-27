import { Interface } from '@ethersproject/abi'
import { abi as AIRDROP_ABI } from './airdrop.json'

const AIRDROP_INTERFACE = new Interface(AIRDROP_ABI)
const AIRDROP_ADDRESS = '0x3d65a393D5F2ea7D3507ba9E666C7CA8253078E3'

export default AIRDROP_INTERFACE
export { AIRDROP_ABI, AIRDROP_ADDRESS }
