import { Interface } from '@ethersproject/abi'
import { abi as PRESALE_ABI } from './presale.json'
import { abi as DATETIME_ABI } from './datetime.json'

const PRESALE_INTERFACE = new Interface(PRESALE_ABI)
const PRESALE_ADDRESS = '0xe0A5F731B4674666B7C86cf68eBeCf32e0DE7300'

const DATETIME_ADDRESS = '0x669eB198EB31D318FeFc2B0F14167A0c2E5495f9'

export default PRESALE_INTERFACE
export { PRESALE_ABI, PRESALE_ADDRESS, DATETIME_ABI, DATETIME_ADDRESS }
