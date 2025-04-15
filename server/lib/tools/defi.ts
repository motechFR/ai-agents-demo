import { zodFunction } from 'openai/helpers/zod';
import { getQuote } from 'server/lib/defi/getQuote';
import { swap } from 'server/lib/defi/swap';
import { Address } from 'viem';
import { z } from 'zod';
import { getUSDC } from '../defi/usdc';
import { getWETHToken } from '../defi/weth';

const userPrivateKey = process.env.WALLET_PRIVATE_KEY as `0x${string}`;

export const swapSchema = z.object({
    sellAmount: z.number().describe("The amount of tokens to sell"),
}).describe("Number of tokens that should be swapped");

type SwapFunctionParams = z.infer<typeof swapSchema>;


export const sellUSDCForWETHToolDefinition = zodFunction({
    name: "sellUSDCForWETH",
    description: "Sell USDC for WETH",
    parameters: swapSchema
});

export async function sellUSDCForWETH({sellAmount}: SwapFunctionParams) {
    const tx = await swap({
        sellToken: getUSDC(),
        buyToken: getWETHToken(),
        sellAmount,
        privateKey: userPrivateKey,
    });
    return tx;
}

export const sellWETHForUSDCToolDefinition = zodFunction({
    name: "sellWETHForUSDC",
    description: "Sell WETH for USDC",
    parameters: swapSchema
});

export async function sellWETHForUSDC({sellAmount}: SwapFunctionParams) {
    const tx = await swap({
        sellToken: getWETHToken(),
        buyToken: getUSDC(),
        sellAmount,
        privateKey: userPrivateKey,
    });
    return tx;
}

export const getTokenQuoteSchema = z.object({
    sellAmount: z.number().describe("The amount of tokens to sell"),
    sellToken: z.enum(['USDC', 'WETH']).describe("The token to sell"),
}).describe("Get how many tokens you will receive for a given amount of tokens you sell");

type GetTokenQuoteFunctionParams = z.infer<typeof getTokenQuoteSchema>;

export const getTokenQuoteToolDefinition = zodFunction({
    name: "getTokenQuote",
    description: "Get how many tokens you will receive for a given amount of tokens you sell",
    parameters: getTokenQuoteSchema
});

export async function getTokenQuote({sellAmount, sellToken}: GetTokenQuoteFunctionParams) {
    const quote = await getQuote({
        sellTokenAddress: (sellToken === 'USDC' ? getUSDC().address : getWETHToken().address) as Address,
        buyTokenAddress: (sellToken === 'USDC' ? getWETHToken().address : getUSDC().address) as Address,
        sellAmount,
    });
    return quote;
}
