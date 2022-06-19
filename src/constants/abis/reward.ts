import { Interface } from '@ethersproject/abi'
import { abi as REWARD_ABI } from './reward.json'

const REWARD_INTERFACE = new Interface(REWARD_ABI)
const REWARD_ADDRESS = '0x020E1C8eB92e92Ee4f333E36AB8109A54De0fB44'

export default REWARD_INTERFACE
export { REWARD_ABI, REWARD_ADDRESS }
