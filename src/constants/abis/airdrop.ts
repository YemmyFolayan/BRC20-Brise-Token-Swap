import { Interface } from '@ethersproject/abi'
import { abi as AIRDROP_ABI } from './airdrop.json'

const AIRDROP_INTERFACE = new Interface(AIRDROP_ABI)
const AIRDROP_ADDRESS = '0x47F8d439E16E5A5ca75E3745048D5225e8DC7203'

export default AIRDROP_INTERFACE
export { AIRDROP_ABI, AIRDROP_ADDRESS }
