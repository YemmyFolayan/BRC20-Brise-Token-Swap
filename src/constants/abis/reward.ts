import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0xC2e7bB3dADbF79A8A6463000F7967cCe51BF1174'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
