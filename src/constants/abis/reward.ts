import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0xeC4040490337b2D553dCC42BDBD0eD8da378F07f'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
