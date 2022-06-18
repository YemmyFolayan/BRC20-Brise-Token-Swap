import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0x643334b8421061506D2A12F046F3d4cC6dD96c0B'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
