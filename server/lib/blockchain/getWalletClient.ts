import {
    Hex,
    createPublicClient,
    createWalletClient,
    http,
    publicActions,
  } from "viem";
  import { base } from "viem/chains";
  import { privateKeyToAccount } from "viem/accounts";
 
  
const BASE_RPC_URL = () => {
    if (process.env.ALCHEMY_API_KEY) {
        return `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    }
    return 'https://mainnet.base.org'
}

export const ethClient = createPublicClient({
chain: base,
transport: http(BASE_RPC_URL()),
});
  
export type PrivateKey = {
    privateKey: string;
}

export type OptionalPrivateKey = Partial<PrivateKey>;

export function getWalletClient({ privateKey }: OptionalPrivateKey) {
    const pk = privateKey ?? process.env.PRIVATE_KEY;
    if (!pk) {
      throw new Error("PRIVATE_KEY is not set");
    }
  
    return createWalletClient({
      account: privateKeyToAccount(pk.startsWith("0x") ? (pk as Hex) : `0x${pk}`),
      chain: base,
      transport: http(BASE_RPC_URL()),
 
    }).extend(publicActions);
}
  