import { z, ZodRawShape } from 'zod';
import { zodFunction } from 'openai/helpers/zod';

export const getEthPriceSchema = z.object({
    currency: z.enum(['USD', 'EUR', 'JPY'])
    .describe('The currency to get the price in')
}).describe('Get the price of Ethereum');

export const getEthPriceToolDefinition = zodFunction({
    name: 'getEthPrice',
    description: 'Get the price of Ethereum in a given currency',
    parameters: getEthPriceSchema
});

type FunctionParameters = z.infer<typeof getEthPriceSchema>;


/**
 * @docs https://developers.coindesk.com/documentation/data-api/spot_v1_latest_tick
 */
export async function getEthPrice({ currency }: FunctionParameters): Promise<{amount: number, currency: string}> {

    const response = await fetch(`https://data-api.coindesk.com/spot/v1/latest/tick?market=coinbase&instruments=ETH-${currency}&apply_mapping=true&api_key=${process.env.COINDESK_API_KEY}`);
    const data = await response.json();

    return {
        currency,
        amount: data.Data[`ETH-${currency}`].PRICE,
    }
}