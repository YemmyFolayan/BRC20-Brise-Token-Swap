import { Interface } from '@ethersproject/abi'
import ERC20_ABI from './erc20.json'
import ERC20_BYTES32_ABI from './erc20_bytes32.json'
import TOKEN_CREATOR from './TokenCreator.json'

const ERC20_INTERFACE = new Interface(ERC20_ABI)
const TOKEN_CREATOR_ABI = TOKEN_CREATOR.abi
const TOKEN_CREATOR_ADDRESS = '0xd4e882fC3d35fA00E110253ffC4891f76869d636'

export default ERC20_INTERFACE
export { ERC20_ABI, ERC20_BYTES32_ABI, TOKEN_CREATOR_ABI, TOKEN_CREATOR_ADDRESS }
