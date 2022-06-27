import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0x10e222DEa21687CbE64670557F6e447427e5BEcD'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
