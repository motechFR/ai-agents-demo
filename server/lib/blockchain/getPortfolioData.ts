import { gql, InMemoryCache, ApolloClient } from '@apollo/client/core/index.js'
import { z } from 'zod';
import { zodFunction } from 'openai/helpers/zod';

// Define the Network enum
enum Network {
  BASE_MAINNET = 'BASE_MAINNET'
}

// Define the GraphQL query
const PORTFOLIO_QUERY = gql`
  query Portfolio($addresses: [Address!]!, $first: Int!, $network: Network!) {
    portfolioV2(addresses: $addresses, networks: [$network]) {
      tokenBalances {
        totalBalanceUSD
        byToken(first: $first, filters: {
          minBalanceUSD: 1
        }) {
          totalCount
          edges {
            node {
              name
              symbol
              price
              tokenAddress
              imgUrlV2
              decimals
              balanceRaw
              balance
              balanceUSD
              network {
                name
              }
            }
          }
        }
      }
    }
  }
`;

// Define the schema for the function parameters
export const getPortfolioDataSchema = z.object({
  address: z.string()
    .describe('The blockchain address to fetch portfolio data for')
}).describe('Get portfolio data for a blockchain address');

// Create the tool definition
export const getPortfolioDataToolDefinition = zodFunction({
  name: 'getPortfolioData',
  description: 'Get portfolio data for a blockchain address, showing token balances and their USD values',
  parameters: getPortfolioDataSchema
});

// Infer the parameter type from the schema
type FunctionParameters = z.infer<typeof getPortfolioDataSchema>;

// Define the response type structure
type PortfolioDataFromZapper = {
  portfolioV2: {
    tokenBalances: {
      totalBalanceUSD: number;
      byToken: {
        totalCount: number;
        edges: Array<{
          node: {
            name: string;
            symbol: string;
            price: number;
            tokenAddress: string;
            imgUrlV2: string;
            decimals: number;
            balanceRaw: string;
            balance: number;
            balanceUSD: number;
            network: {
              name: string;
            };
          };
        }>;
      };
    };
  };
};

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://public.zapper.xyz/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
    'x-zapper-api-key': process.env.ZAPPER_XYZ_API_KEY as string,
  },
});

type PortfolioTokenData = {
  balance: number;
  balanceUSD: number;
  tokenImage: string;
  tokenName: string;
  tokenAddress: string;
  network: string;
}

type ChainPortfolioData = {
  totalBalanceUSD: number;
  chain: string;
  balances: PortfolioTokenData[];
}

/**
 * Fetches portfolio data for a blockchain address
 * @param address The blockchain address to fetch portfolio data for
 * @returns Portfolio data including token balances and USD values
 */
export async function getPortfolioData({ address }: FunctionParameters): Promise<ChainPortfolioData> {
  try {
    const { data } = await client.query<PortfolioDataFromZapper>({
      query: PORTFOLIO_QUERY,
      variables: {
        addresses: [address],
        first: 10, // Fetch up to 100 tokens
        network: Network.BASE_MAINNET // Hardcoded as per requirements
      },
    });

    console.log(JSON.stringify(data, null, 2));

    const responseData: ChainPortfolioData = {
      totalBalanceUSD: parseFloat(data.portfolioV2.tokenBalances.totalBalanceUSD.toFixed(2)),
      chain: Network.BASE_MAINNET,
      balances: data.portfolioV2.tokenBalances.byToken.edges.map((edge) => ({
        balance: parseFloat(edge.node.balance.toFixed(2)),
        balanceUSD: parseFloat(edge.node.balanceUSD.toFixed(2)),
        tokenImage: edge.node.imgUrlV2,
        tokenName: edge.node.name,
        tokenSymbol: edge.node.symbol,
        tokenAddress: edge.node.tokenAddress,
        network: edge.node.network.name,
      })).sort((a, b) => b.balanceUSD - a.balanceUSD),
    }

    return responseData;
  } catch (error) {

    console.error('Error fetching portfolio data:', error);

    throw error;
  }
}
