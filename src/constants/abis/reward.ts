import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0xEae2f08C85d44FCba132D3E1e1E3a60A0f2d9FB8'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
