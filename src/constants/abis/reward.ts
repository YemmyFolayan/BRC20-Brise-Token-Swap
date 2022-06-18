import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0x5c20b634B49eD100A643732EeadE953148CAEcE3'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
