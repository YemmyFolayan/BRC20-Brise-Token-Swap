import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0x0E5581d23eDFFe4EDe9A608B51008C1673047370'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
