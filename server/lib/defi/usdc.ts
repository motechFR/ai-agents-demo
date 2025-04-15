import { Token } from "@uniswap/sdk-core";
import { Address, parseAbi } from "viem";
import { base } from "viem/chains";
import { ethClient } from "../blockchain/getWalletClient";

// WETH contract address on Base
export const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const USDC_DECIMALS = 6;

// WETH ABI for wrap/unwrap functions
const USDC_ABI = parseAbi([
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function balanceOf(address owner) external view returns (uint256)",
]);

// Creates a Token instance for WETH
export function getUSDC(): Token {
  return new Token(base.id, USDC_ADDRESS, USDC_DECIMALS);
}

/**
 * Gets the WETH balance of an address
 * @param address The address to check
 * @returns The WETH balance in ETH units (not wei)
 */
export async function getUSDCBalance(address: Address): Promise<number> {
  const balance = await ethClient.readContract({
    address: USDC_ADDRESS as Address,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  
  return Number(balance) / 10**USDC_DECIMALS;
} 