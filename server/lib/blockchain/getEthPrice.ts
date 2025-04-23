import { zodFunction } from 'openai/helpers/zod';
import { z } from 'zod';

import { gql } from '@apollo/client/core/index.js';

import { BASE_WETH_ADDRESS, Blockchain } from './constants';
import { zapperGraphqlClient } from './zapperGraphqlClient';

export const getEthPriceSchema = z.object({}).describe('Get the price of Ethereum');

export const getEthPriceToolDefinition = zodFunction({
    name: 'getEthPrice',
    description: 'Get the price of Ethereum in USD',
    parameters: getEthPriceSchema
});

type FunctionParameters = z.infer<typeof getEthPriceSchema>;


// Define the GraphQL query
const PORTFOLIO_QUERY = gql`
  query TokenPriceData(
  $address: Address!
  $chainId: Int!
) {
  fungibleTokenV2(address: $address, chainId: $chainId) {
    # Basic token information
    address
    symbol
    name
    decimals
    imageUrlV2

    # Market data and pricing information
    priceData {
      marketCap
      price
      priceChange5m
      priceChange1h
      priceChange24h
      volume24h
      totalGasTokenLiquidity
      totalLiquidity
    }
  }
}
`;


// Define the response type structure
type TokenPriceDataFromZapper = {
  fungibleTokenV2: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    imageUrlV2: string;
    priceData: {
      marketCap: number;
      price: number;
      priceChange5m: number;
      priceChange1h: number;
      priceChange24h: number;
      volume24h: number;
      totalGasTokenLiquidity: number;
      totalLiquidity: number;
    }
  }
};

/**
 * Fetches portfolio data for a blockchain address
 * @param address The blockchain address to fetch portfolio data for
 * @returns Portfolio data including token balances and USD values
 */
export async function getEthPrice({}: FunctionParameters = {}): Promise<{amount: number; currency: 'USD'}> {
  try {
    const { data } = await zapperGraphqlClient.query<TokenPriceDataFromZapper>({
      query: PORTFOLIO_QUERY,
      variables: {
        address: BASE_WETH_ADDRESS,
        chainId: Blockchain.BASE_MAINNET,
      },
    });

    return {
      amount: data.fungibleTokenV2.priceData.price,
      currency: 'USD'
    };
  } catch (error) {

    console.error('Error fetching portfolio data:', error);

    throw error;
  }
}
getEthPrice({ currency: 'USD' }).then(console.log);