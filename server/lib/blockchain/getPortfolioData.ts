import { zodFunction } from 'openai/helpers/zod';
import { formatUnits } from 'viem';
import { z } from 'zod';
import { Blockchain } from './constants';
import { base } from 'viem/chains';
import { getEthPrice } from './getEthPrice';

export const getPortfolioDataSchema = z.object({
  address: z.string().describe('The blockchain address to fetch portfolio data for'),
}).describe('Get portfolio data for a blockchain address');

// Create the tool definition
export const getPortfolioDataToolDefinition = zodFunction({
  name: 'getPortfolioData',
  description: 'Get portfolio data for a blockchain address, showing token balances and their USD values',
  parameters: getPortfolioDataSchema
});

// Internal function parameters might still need chain info
type FunctionParameters = z.infer<typeof getPortfolioDataSchema>;

// Define the response type structure from Alchemy
type AlchemyTokenPrice = {
  currency: string;
  value: string;
  lastUpdatedAt: string;
};

type AlchemyTokenMetadata = {
  symbol: string;
  decimals: number;
  name: string;
  logo: string | null;
};

type AlchemyToken = {
  address: string;
  network: string; // e.g., "base-mainnet"
  tokenAddress: string | null; // null for native token
  tokenBalance: string; // Hex string
  tokenPrices: AlchemyTokenPrice[];
  tokenMetadata?: AlchemyTokenMetadata; // Optional metadata
};

type AlchemyApiResponse = {
  data: {
    tokens: AlchemyToken[];
  };
};


// Define the output structure - adjusted for Alchemy data
type PortfolioTokenData = {
  balance: number;
  balanceUSD: number;
  tokenSymbol: string; // Added symbol
  tokenName: string;
  tokenAddress: string | null; // Can be null for native
  network: {
    name: string;
    chainId: number;
  };
  // tokenImage removed as logo is often null
}

type ChainPortfolioData = {
  totalBalanceUSD: number;
  // chain: Blockchain; // We might add this back if chain mapping is implemented
  balances: PortfolioTokenData[];
}

// TODO: Move API Key to environment variables
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || 'YOUR_ALCHEMY_API_KEY'; // Replace with actual key or env var loading
const ALCHEMY_API_URL = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

/**
 * Fetches portfolio data for a blockchain address using Alchemy API
 * @param address The blockchain address to fetch portfolio data for
 * @returns Portfolio data including token balances and USD values
 */
export async function getPortfolioData({ address }: FunctionParameters): Promise<ChainPortfolioData> {
  // TODO: Map internal chainId concept (if needed) to Alchemy network strings
  const network = "base-mainnet";

  const payload = {
    addresses: [
      {
        address: address,
        networks: [network]
      }
    ],
    withMetadata: true,
    withPrices: true,
    includeNativeTokens: true
  };

  try {
    const response = await fetch(ALCHEMY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, ${await response.text()}`);
    }

    const data = await response.json() as AlchemyApiResponse;

    let totalBalanceUSD = 0;
    const balances: PortfolioTokenData[] = [];

    for (const token of data.data.tokens) {
      const metadata = token.tokenMetadata;
      const decimals = metadata?.decimals ?? 18; // Default to 18 for native or missing metadata
      const balance = parseFloat(formatUnits(BigInt(token.tokenBalance), decimals)); // Use viem or similar to parse hex

      // Find USD price
      let price: number;
      const zeroAddress = '0x0000000000000000000000000000000000000000';
      const isNativeEth = token.tokenAddress === null || token.tokenAddress === zeroAddress;
      
      const usdPriceData = token.tokenPrices.find(p => p.currency === 'usd');

      if (isNativeEth && (!usdPriceData || token.tokenPrices.length === 0)) {
        // Handle native ETH price potentially missing from tokenPrices
        const ethPriceData = await getEthPrice();
        price = ethPriceData.amount;
      } else if (usdPriceData) {
        price = parseFloat(usdPriceData.value);
      } else {
        price = 0; // Default to 0 if price data is missing for non-native tokens
      }

      const balanceUSD = balance * price;

      // Only show token balances with at least $0.50 in value
      if (balanceUSD < 0.5) {
        continue;
      }
      totalBalanceUSD += balanceUSD;

      let tokenSymbol: string;
      let tokenName: string;
      

      // Check for native token (null or zero address)
      if (isNativeEth) { // Use the calculated boolean
        tokenSymbol = 'ETH';
        tokenName = 'Ethereum';
      } else {
        tokenSymbol = metadata?.symbol ?? 'Unknown Symbol'; // Fallback if metadata is missing for non-native
        tokenName = metadata?.name ?? 'Unknown Name';     // Fallback if metadata is missing for non-native
      }

      

      balances.push({
        balance: (tokenSymbol === 'ETH' || tokenSymbol === 'WETH') ? parseFloat(balance.toFixed(4)) : parseFloat(balance.toFixed(2)), // Keep reasonable precision
        balanceUSD: parseFloat(balanceUSD.toFixed(2)),
        tokenSymbol: tokenSymbol,
        tokenName: tokenName,
        tokenAddress: token.tokenAddress,
        network: {
          chainId: Blockchain.BASE_MAINNET,
          name: base.name
        }
      });
    }

    // Sort by USD value descending
    balances.sort((a, b) => b.balanceUSD - a.balanceUSD);

    const responseData: ChainPortfolioData = {
      totalBalanceUSD: parseFloat(totalBalanceUSD.toFixed(2)),
      // chain: chainId, // Add back if needed
      balances: balances,
    }

    return responseData;

  } catch (error) {
    console.error('Error fetching portfolio data from Alchemy:', error);
    throw error; // Re-throw the error after logging
  }
}
