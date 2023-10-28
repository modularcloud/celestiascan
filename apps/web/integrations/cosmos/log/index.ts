import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { getMessages } from "service-manager";
import { z } from "zod";
import { JSONRPCResponse, Transaction } from "service-manager/types/rpc.type";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

export async function MessageExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const [hash, index] = query.split(":");
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

  return messages[Number(index)];
}

export const MessageLoader = createLoader()
  .addExtract(MessageExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
