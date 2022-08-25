import { Interface } from '@ethersproject/abi'
import ERC20_ABI from './erc20.json'
import ERC20_BYTES32_ABI from './erc20_bytes32.json'
import TOKEN_CREATOR from './TokenCreator.json'

const ERC20_INTERFACE = new Interface(ERC20_ABI)
const TOKEN_CREATOR_ABI = TOKEN_CREATOR.abi
const TOKEN_CREATOR_ADDRESS = '0x39Fe582D05a3D414AE1711543cAe66448F9B936d'

export default ERC20_INTERFACE
export { ERC20_ABI, ERC20_BYTES32_ABI, TOKEN_CREATOR_ABI, TOKEN_CREATOR_ADDRESS }
