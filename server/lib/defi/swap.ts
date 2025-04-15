// TODO - https://docs.uniswap.org/sdk/v3/guides/swaps/trading#introduction

import { Token } from "@uniswap/sdk-core";
import {
    Address,
    encodeFunctionData,
    getAddress,
    parseEventLogs,
    parseUnits,
    TransactionSerializable
} from "viem";
import { base } from "viem/chains";
import { ethClient, getWalletClient, PrivateKey } from "../blockchain/getWalletClient";
import { ensureAllowance } from "./allowance";
import { getPool } from "./getPool";
import { getQuote } from "./getQuote";
import { getWETHBalance, WETH_ADDRESS, wrapETH } from "./weth";

// Refer to https://docs.uniswap.org/contracts/v3/reference/deployments/base-deployments
const SWAP_ROUTER_ADDRESS = "0x2626664c2603336E57B271c5C0b26F421741e481";

export type SwapResult = {
    transactionHash: `0x${string}`;
    receipt: {
      status: "success" | "reverted";
      blockNumber: number;
      gasUsed: string;
    };
    swapDetails: {
      amountIn: string;
      amountOut: string;
      tokenIn: string;
      tokenOut: string;
    };
  };


export async function swap({
  sellToken,
  buyToken,
  sellAmount,
  privateKey,
}: {
  sellToken: Token;
  buyToken: Token;
  sellAmount: number;
} & PrivateKey): Promise<SwapResult> {
  const walletClient = getWalletClient({ privateKey });

  // Check if selling WETH
  const isSellingWETH = sellToken.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
  
  if (isSellingWETH) {
    // Check if we have enough WETH
    const wethBalance = await getWETHBalance(walletClient.account.address);
    console.log(`Current WETH balance: ${wethBalance}, required: ${sellAmount}`);
    
    // If WETH balance is insufficient, wrap more ETH
    if (wethBalance < sellAmount) {
      const amountToWrap = sellAmount - wethBalance + (sellAmount * 0.05); // Add 5% buffer
      console.log(`Insufficient WETH. Wrapping additional ${amountToWrap} ETH to WETH...`);
      
      await wrapETH({
        amount: amountToWrap,
        privateKey,
      });
      
      console.log(`Additional ETH wrapped. New WETH balance: ${await getWETHBalance(walletClient.account.address)}`);
    }
  }

  const [pool, amountOut] = await Promise.all([
    getPool(sellToken, buyToken),
    getQuote({
      sellTokenAddress: getAddress(sellToken.address),
      buyTokenAddress: getAddress(buyToken.address),
      sellAmount: sellAmount,
    }),
  ]);
  
  console.log("amountOut", amountOut);

  await ensureAllowance({
    token: sellToken,
    spender: SWAP_ROUTER_ADDRESS,
    amount: Math.round(sellAmount * 1.05),
    privateKey,
  });

  await ensureAllowance({
    token: buyToken,
    spender: SWAP_ROUTER_ADDRESS,
    privateKey,
  });

  console.log("allowance checked")

  const data = encodeFunctionData({
    abi: swapRouterABI,
    functionName: "exactInputSingle",
    args: [
      {
        tokenIn: sellToken.address as Address,
        tokenOut: buyToken.address as Address,
        fee: pool.fee,
        recipient: walletClient.account.address,
        amountIn: parseUnits(sellAmount.toString(), sellToken.decimals),
        amountOutMinimum:
          (parseUnits(amountOut.quote, buyToken.decimals) * 98n) / 100n,
        sqrtPriceLimitX96: BigInt(0),
      },
    ],
  });

  const swapTx: TransactionSerializable = {
    to: SWAP_ROUTER_ADDRESS,
    data,
    value: 0n,
    type: "eip1559",
    chainId: base.id,
    ...(await ethClient.estimateFeesPerGas()),
  };
  console.log("swapTx", swapTx);
  const tx = await walletClient.sendTransaction(swapTx);

  const receipt = await ethClient.waitForTransactionReceipt({ hash: tx });

  const parsedLogs = parseEventLogs({
    logs: receipt.logs,
    abi: swapRouterABI,
  });

  if (!parsedLogs || parsedLogs.length === 0) {
    console.log("Swap event not found in transaction logs");
  }

// TODO - check logs later
//   const decodedLog = parsedLogs[0];
//   const amountIn = decodedLog.args.amount0.toString();
//   const amountOutExecuted = decodedLog.args.amount1.toString();


// Not entirely exact, there might be slippage
  const amountIn = sellAmount;
  const amountOutExecuted = amountOut.quote;

   console.log("Swap Event - Amount In:", amountIn, "Amount Out:", amountOutExecuted);

  console.log("Executed Swap", tx);

  return {
    transactionHash: tx,
    receipt: {
      status: receipt.status,
      blockNumber: Number(receipt.blockNumber),
      gasUsed: receipt.gasUsed.toString()
    },
    swapDetails: {
      amountIn: amountIn.toString(),
      amountOut: amountOutExecuted.toString(),
      tokenIn: sellToken.address,
      tokenOut: buyToken.address
    }
  };
}

const swapRouterABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Swap",
    type: "event",
  },
] as const;

// Example usage with WETH - updated to use regular swap function
// swap({
//   sellToken: getUSDC(), // Base USDC
//   buyToken: getWETHToken(), // This will auto wrap ETH if needed
//   sellAmount: 1,
//   privateKey: process.env.WALLET_PRIVATE_KEY as string,
// }).then(console.log).catch(console.error);