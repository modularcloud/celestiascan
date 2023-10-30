import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { getMessages } from "service-manager";
import { z } from "zod";
import { JSONRPCResponse, Transaction } from "service-manager/types/rpc.type";
import { AssociatedTransform } from "./associated";
import { CardTransform } from "./card";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { RowTransform } from "./row";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function TransactionExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const hash = z.string().parse(_q);
  const FetchPath = async (path: string) => {
    console.log(path);
    const res = await fetch(path);

    if (!res.ok) {
      throw Error(`Response code ${res.status}: ${res.statusText}`);
    }
    return res.json();
  };
  const txResponse: JSONRPCResponse<Transaction> = await Promise.any([
    FetchPath(
      `${metadata.endpoint}/tx?hash=0x${hash.toUpperCase()}&prove=false`,
    ),
    FetchPath(`${metadata.endpoint}/tx?hash=${hash.toUpperCase()}&prove=false`),
  ]);
  const messages = getMessages(txResponse.result.tx);
  return {
    ...txResponse,
    messages,
  };
}

export const TransactionLoader = createLoader()
  .addExtract(TransactionExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
