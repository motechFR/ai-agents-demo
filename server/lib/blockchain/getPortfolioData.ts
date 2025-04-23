import { zodFunction } from 'openai/helpers/zod';
import { formatUnits } from 'viem'; // We'll need a utility for hex conversion
import { z } from 'zod';

// Define the schema for the function parameters - Only address is exposed
export const getPortfolioDataSchema = z.object({
  address: z.string().describe('The blockchain address to fetch portfolio data for'),
  // chainId removed as requested for the *exposed* schema
}).describe('Get portfolio data for a blockchain address');

// Create the tool definition
export const getPortfolioDataToolDefinition = zodFunction({
  name: 'getPortfolioData',
  description: 'Get portfolio data for a blockchain address, showing token balances and their USD values',
  parameters: getPortfolioDataSchema
});

// Internal function parameters might still need chain info
type FunctionParameters = {
  address: string;
  // We might need chainId internally to map to Alchemy network strings
  // For now, we'll hardcode it in the function based on the example.
  // chainId: Blockchain;
};

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
  network: string;
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
      const usdPriceData = token.tokenPrices.find(p => p.currency === 'usd');
      const price = usdPriceData ? parseFloat(usdPriceData.value) : 0;
      const balanceUSD = balance * price;

      totalBalanceUSD += balanceUSD;

      balances.push({
        balance: parseFloat(balance.toFixed(4)), // Keep reasonable precision
        balanceUSD: parseFloat(balanceUSD.toFixed(2)),
        tokenSymbol: metadata?.symbol ?? 'NATIVE', // Use 'NATIVE' for native token symbol
        tokenName: metadata?.name ?? 'Native Token', // Use 'Native Token' for native token name
        tokenAddress: token.tokenAddress,
        network: token.network,
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
