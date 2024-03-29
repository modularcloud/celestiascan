import { z } from "zod";
import { zfd } from "zod-form-data";

export const localChainFormSchema = zfd.formData({
  chainName: z.string(),
  namespace: z.string().optional(),
  startHeight: z.string().optional(),
  logo: zfd.file(z.instanceof(File).optional()),
  rpcUrl: z.string().url(),
  rpcPlatform: z.enum(["cosmos"]).default("cosmos"),
  tokenDecimals: z.coerce.number().int().positive(),
  tokenName: z.string(),
});
