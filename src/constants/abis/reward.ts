import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0x2017A4645ebE3DAdF7056d96f325bA6b74Ec1826'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
