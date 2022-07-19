import { Interface } from '@ethersproject/abi'
import { abi as PRESALE_ABI } from './presale.json'

const PRESALE_INTERFACE = new Interface(PRESALE_ABI)
const PRESALE_ADDRESS = '0xe0A5F731B4674666B7C86cf68eBeCf32e0DE7300'

export default PRESALE_INTERFACE
export { PRESALE_ABI, PRESALE_ADDRESS }
