import { Interface } from '@ethersproject/abi'
import { abi as AIRDROP_ABI } from './airdrop.json'

const AIRDROP_INTERFACE = new Interface(AIRDROP_ABI)
const AIRDROP_ADDRESS = '0x0dE2fA5ac7ef946B870d62681B01B340Af08a28D'

export default AIRDROP_INTERFACE
export { AIRDROP_ABI, AIRDROP_ADDRESS }
