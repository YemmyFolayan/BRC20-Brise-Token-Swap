import { Interface } from '@ethersproject/abi'
import { abi as LOCK_ABI } from './lock.json'

const LOCK_INTERFACE = new Interface(LOCK_ABI)
const LOCK_ADDRESS = '0x2C529D33859BfB10b9D06199AE5681B866dD8e00'

export default LOCK_INTERFACE
export { LOCK_ABI, LOCK_ADDRESS }
