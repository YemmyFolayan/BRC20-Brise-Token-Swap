import { Interface } from '@ethersproject/abi'
import { abi as PRESALE_ABI } from './presale.json'

const PRESALE_INTERFACE = new Interface(PRESALE_ABI)
const PRESALE_ADDRESS = '0x2A5F3d70cac2699B8654D89D5D7ceaE85Dc90798'

export default PRESALE_INTERFACE
export { PRESALE_ABI, PRESALE_ADDRESS }
