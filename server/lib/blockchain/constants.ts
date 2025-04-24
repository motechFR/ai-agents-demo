import { base, baseSepolia, gnosis, mainnet, optimism, sepolia } from "viem/chains";


export const BASE_WETH_ADDRESS = '0x4200000000000000000000000000000000000006';

// Define the Network enum
export enum Blockchain {
    ETHEREUM = mainnet.id,
    BASE_MAINNET = base.id,
    OPTIMISM_MAINNET = optimism.id,
    BASE_SEPOLIA = baseSepolia.id,
    SEPOLIA = sepolia.id,
    GNOSIS = gnosis.id
  }