import { zodFunction } from 'openai/helpers/zod';
import { z } from 'zod';
import { BASE_WETH_ADDRESS } from './constants';

export const getEthPriceSchema = z.object({}).describe('Get the price of Ethereum');

export const getEthPriceToolDefinition = zodFunction({
    name: 'getEthPrice',
    description: 'Get the price of Ethereum in USD',
    parameters: getEthPriceSchema
});

type FunctionParameters = z.infer<typeof getEthPriceSchema>;

// Define the response type structure from Alchemy Price API
type AlchemyPriceApiResponse = {
  data: Array<{
    symbol: string;
    prices: Array<{
      currency: string;
      value: string;
      lastUpdatedAt: string;
    }>;
  }>;
};

// TODO: Move API Key to environment variables
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || 'YOUR_ALCHEMY_API_KEY'; // Replace with actual key or env var loading
const ALCHEMY_PRICE_API_BASE_URL = `https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/by-symbol?symbols[0]=ETH`;

/**
 * Fetches the current price of Ethereum (via WETH on Base) using Alchemy Price API
 * @returns The price of ETH in USD
 */
export async function getEthPrice({}: FunctionParameters = {}): Promise<{amount: number; currency: 'USD'}> {
  // We use WETH address on Base mainnet to get the ETH price reference on that chain
  const tokenAddress = BASE_WETH_ADDRESS;
  const currency = 'usd';

  const url = new URL(ALCHEMY_PRICE_API_BASE_URL);
//   url.searchParams.append('tokenAddress', tokenAddress);
//   url.searchParams.append('currency', currency);
  url.searchParams.append('symbols', 'ETH');

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, ${await response.text()}`);
    }

    const {data} = await response.json() as AlchemyPriceApiResponse;


    const price = parseFloat(parseFloat(data[0].prices[0].value).toFixed(2));

    if (isNaN(price)) {
      throw new Error(`Invalid price received from Alchemy: ${price}`);
    }

    return {
      amount: price,
      currency: 'USD'
    };

  } catch (error) {
    console.error('Error fetching ETH price from Alchemy:', error);
    throw error; // Re-throw the error after logging
  }
}

