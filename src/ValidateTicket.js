import { ethers } from "ethers"
import abi from './contract/abi.json'

const ankrRpc = 'https://rpc.ankr.com/polygon'
const provider = new ethers.providers.JsonRpcProvider(ankrRpc, 137)

export const contract = new ethers.Contract('0x2953399124f0cbb46d2cbacd8a89cf0599974963', abi, provider)

