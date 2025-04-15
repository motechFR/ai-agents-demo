import { FeeAmount, Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { computePoolAddress } from "@uniswap/v3-sdk";
import { Address, getAddress } from "viem";
import { ethClient } from "../blockchain/getWalletClient";

const POOL_FACTORY_ADDRESS = "0x33128a8fC17869897dcE68Ed026d694621f6FDfD";

interface PoolInfo {
  fee: number;
  liquidity: bigint;
  sqrtPriceX96: bigint;
  tick: number;
}

async function getPoolInfo(poolAddress: Address): Promise<PoolInfo> {
  const [fee, liquidity, slot0] = await Promise.all([
    ethClient.readContract({
      abi: IUniswapV3PoolABI.abi,
      address: poolAddress,
      functionName: "fee",
    }) as Promise<number>,
    ethClient.readContract({
      abi: IUniswapV3PoolABI.abi,
      address: poolAddress,
      functionName: "liquidity",
    }) as Promise<bigint>,
    ethClient.readContract({
      abi: IUniswapV3PoolABI.abi,
      address: poolAddress,
      functionName: "slot0",
    }) as Promise<[bigint, number]>,
  ]);
  return {
    fee,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

export async function getPool(tokenA: Token, tokenB: Token): Promise<Pool> {
  const poolAddress = getAddress(
    computePoolAddress({
      factoryAddress: POOL_FACTORY_ADDRESS,
      tokenA,
      tokenB,
      // TODO: Why is this high? We seem to need the pool Fee for the address.
      fee: FeeAmount.HIGH,
    }),
  );
  const poolInfo = await getPoolInfo(poolAddress);
  return new Pool(
    tokenA,
    tokenB,
    poolInfo.fee,
    poolInfo.sqrtPriceX96.toString(),
    poolInfo.liquidity.toString(),
    poolInfo.tick,
  );
}
