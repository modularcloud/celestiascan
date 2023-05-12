import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import Web3 from "web3";
import { z } from "zod";
import { PaginationTransform } from "./pagination";

export async function PaginationExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = z.string().parse(_q);
  const [value, collection, nextToken] = query.split(":");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);

  if (collection === "latest") {
    if (value === "transactions") {
      const latest = await mc.evm.getRecentTransactions(
        metadata.network.id,
        30
      );
      return {
        value,
        latest,
      };
    }
    if (value === "blocks") {
      let latestBlockNumber: number;
      if (nextToken && !isNaN(parseInt(nextToken))) {
        latestBlockNumber = parseInt(nextToken);
      } else {
        const web3 = new Web3(metadata.endpoint);
        latestBlockNumber = await web3.eth.getBlockNumber();
      }
      return {
        value,
        latestBlockNumber,
      };
    }
    throw new Error("Latest value for this collection not supported");
  }
  if (collection === "account-transfers") {
    const transfers = await mc.evm.getEventsByAccountAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      "account-transfers": transfers,
    };
  }
  if (collection === "account-nft-transfers") {
    const transfers = await mc.evm.getNFTEventsByAccountAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      "account-nft-transfers": transfers,
    };
  }
  if (collection === "token-transfers") {
    const transfers = await mc.evm.getEventsByTokenAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      "token-transfers": transfers,
    };
  }
  if (collection === "transactions") {
    const transactions = await mc.evm.getTransactionsByAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      transactions,
    };
  }
  if (collection === "holders") {
    const holders = await mc.evm.getAccountBalancesByTokenAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      holders,
    };
  }
}

export const PaginationLoader = createLoader()
  .addExtract(PaginationExtract)
  .addTransform(PaginationTransform)
  .finish();
