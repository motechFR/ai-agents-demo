import { Address, parseUnits } from "viem";
import { Token } from "@uniswap/sdk-core";
import { base } from "viem/chains";
import { ethClient, getWalletClient, PrivateKey } from "../blockchain/getWalletClient";
import { parseAbi } from "viem";

// WETH contract address on Base
export const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
export const WETH_DECIMALS = 18;

// WETH ABI for wrap/unwrap functions
const WETH_ABI = parseAbi([
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function balanceOf(address owner) external view returns (uint256)",
]);

// Creates a Token instance for WETH
export function getWETHToken(): Token {
  return new Token(base.id, WETH_ADDRESS, WETH_DECIMALS);
}

/**
 * Wraps native ETH to WETH
 * @param amount Amount of ETH to wrap (in ETH units, not wei)
 * @param privateKey Private key of the account
 * @returns Transaction hash
 */
export async function wrapETH({
  amount,
  privateKey,
}: {
  amount: number;
} & PrivateKey): Promise<`0x${string}`> {
  const walletClient = getWalletClient({ privateKey });
  
  console.log(`Wrapping ${amount} ETH to WETH...`);
  
  const tx = await walletClient.writeContract({
    address: WETH_ADDRESS as Address,
    abi: WETH_ABI,
    functionName: "deposit",
    value: parseUnits(amount.toString(), WETH_DECIMALS),
  });
  
  console.log(`ETH wrapped successfully, tx: ${tx}`);
  
  // Wait for the transaction to be mined
  await ethClient.waitForTransactionReceipt({ hash: tx });
  
  return tx;
}

/**
 * Unwraps WETH to native ETH
 * @param amount Amount of WETH to unwrap (in ETH units, not wei)
 * @param privateKey Private key of the account
 * @returns Transaction hash
 */
export async function unwrapWETH({
  amount,
  privateKey,
}: {
  amount: number;
} & PrivateKey): Promise<`0x${string}`> {
  const walletClient = getWalletClient({ privateKey });
  
  console.log(`Unwrapping ${amount} WETH to ETH...`);
  
  const tx = await walletClient.writeContract({
    address: WETH_ADDRESS as Address,
    abi: WETH_ABI,
    functionName: "withdraw",
    args: [parseUnits(amount.toString(), WETH_DECIMALS)],
  });
  
  console.log(`WETH unwrapped successfully, tx: ${tx}`);
  
  // Wait for the transaction to be mined
  await ethClient.waitForTransactionReceipt({ hash: tx });
  
  return tx;
}

/**
 * Gets the WETH balance of an address
 * @param address The address to check
 * @returns The WETH balance in ETH units (not wei)
 */
export async function getWETHBalance(address: Address): Promise<number> {
  const balance = await ethClient.readContract({
    address: WETH_ADDRESS as Address,
    abi: WETH_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  
  return Number(balance) / 10**WETH_DECIMALS;
} 