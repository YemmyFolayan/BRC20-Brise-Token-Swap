import { Interface } from '@ethersproject/abi'
import { abi as LOCK_ABI } from './lock.json'

const LOCK_INTERFACE = new Interface(LOCK_ABI)
const LOCK_ADDRESS = '0x69215BFA299E1dd0C8A7Ae9e090D5a6F6aCB3122'

export default LOCK_INTERFACE
export { LOCK_ABI, LOCK_ADDRESS }
