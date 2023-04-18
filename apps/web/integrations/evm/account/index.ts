import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function AccountExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const address = z.string().parse(_q);
  if (!address || !address.match(/^\w{42}$/)) {
    throw new Error("Invalid address");
  }
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const balances = await mc.evm.getTokenBalancesByAddress(
    metadata.network.id,
    address
  );

  return {
    address,
    balances,
  };
}

export const AccountLoader = createLoader()
  .addExtract(AccountExtract)
  .addTransform(TopbarTransform)
  .addTransform(SidebarTransform)
  .addTransform(AssociatedTransform)
  .finish();
