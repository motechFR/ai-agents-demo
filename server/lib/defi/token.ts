import { Address, erc20Abi, getContract } from "viem";
import { ethClient } from "../blockchain/getWalletClient";

export async function getTokenTotalSupply(address: Address) {
  return getContract({
    address,
    abi: erc20Abi,
    client: ethClient,
  }).read.totalSupply();
}

export async function getTokenDecimals(address: Address) {
  return getContract({
    address,
    abi: erc20Abi,
    client: ethClient,
  }).read.decimals();
}

export async function getTokenSymbol(address: Address) {
  return getContract({
    address,
    abi: erc20Abi,
    client: ethClient,
  }).read.symbol();
}