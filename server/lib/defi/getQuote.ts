import { CurrencyAmount, Price, Token } from "@uniswap/sdk-core";
import { tickToPrice } from "@uniswap/v3-sdk";
import type { Address } from "viem";
import { parseUnits } from "viem";
import { getPool } from "./getPool";
import { getTokenDecimals } from "./token";
import { base } from "viem/chains";

export async function getQuote({
  sellTokenAddress,
  buyTokenAddress,
  sellAmount,
}: {
  sellTokenAddress: Address;
  buyTokenAddress: Address;
  sellAmount: number;
}): Promise<{ quote: string }> {
  const [sellDecimals, buyDecimals] = await Promise.all([
    getTokenDecimals(sellTokenAddress),
    getTokenDecimals(buyTokenAddress),
  ]);
  const pool = await getPool(
    new Token(base.id, sellTokenAddress, sellDecimals),
    new Token(base.id, buyTokenAddress, buyDecimals),
  );

  // Determine if the sell token is token0 in the pool
  const isSellToken0 =
    sellTokenAddress.toLowerCase() === pool.token0.address.toLowerCase();

  // Use the pool's token instances
  const sellToken = isSellToken0 ? pool.token0 : pool.token1;
  const buyToken = isSellToken0 ? pool.token1 : pool.token0;

  // Get the price from the current tick
  let price = tickToPrice(sellToken, buyToken, pool.tickCurrent);

  // Calculate sell amount in wei using sellToken.decimals
  const sellAmountWei = parseUnits(sellAmount.toString(), sellToken.decimals);

  function buyAmountForSellAmount(
    price: Price<Token, Token>,
    sellAmountWei: bigint,
  ): string {
    const amountIn = CurrencyAmount.fromRawAmount(
      sellToken,
      sellAmountWei.toString(),
    );

    const amountOut = price.quote(amountIn);

    return amountOut.toExact();
  }

  const expectedOutput = buyAmountForSellAmount(price, sellAmountWei);

  return { quote: expectedOutput };
}
