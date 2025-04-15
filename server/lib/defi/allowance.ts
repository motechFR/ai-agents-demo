import { parseUnits } from "viem";

import { parseAbi } from "viem";

import { Token } from "@uniswap/sdk-core";
import { Address } from "viem";
import { ethClient, getWalletClient, OptionalPrivateKey } from "../blockchain/getWalletClient";

export const MAX_APPROVAL = BigInt(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935",
);

export async function ensureAllowance({
  token,
  spender,
  amount,
  privateKey
}: {
  token: Token,
  spender: Address,
  amount?: number | bigint,
} & OptionalPrivateKey): Promise<void> {
  const walletClient = getWalletClient({ privateKey });
  if (
    !amount ||!(await hasAllowance(walletClient.account!.address, token, spender, amount))
  ) {
    console.log("Approving Router for sellAmount...");
    const tx = await walletClient.writeContract({
      address: token.address as Address,
      abi: parseAbi([
        "function approve(address spender, uint256 amount) external",
      ]),
      functionName: "approve",
      args: [spender, MAX_APPROVAL],
    });

    await walletClient.waitForTransactionReceipt({ hash: tx });
    console.log("Approved Router for sellAmount");
  }
}

async function hasAllowance(
  owner: Address,
  token: Token,
  spender: Address,
  amount: number | bigint,
): Promise<boolean> {
  const allowance = await ethClient.readContract({
    address: token.address as Address,
    abi: parseAbi([
      "function allowance(address owner, address spender) external view returns (uint256)",
    ]),
    functionName: "allowance",
    args: [owner, spender],
  });
  return allowance > parseUnits(amount.toString(), token.decimals);
}
