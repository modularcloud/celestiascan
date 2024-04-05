import { z, preprocess } from "zod";
import { zfd } from "zod-form-data";

export const localChainFormSchema = zfd.formData({
  chainName: z.string().trim().min(1),
  namespace: z.string().trim().optional(),
  startHeight: z.coerce.number().int().optional(),
  daLayer: z.string().trim().optional(),
  logo: zfd.file(z.instanceof(Blob).nullish()),
  rpcUrl: z.string().trim().url(),
  rpcPlatform: preprocess(
    (arg) => (typeof arg === "string" ? arg.toLowerCase() : arg),
    z.enum(["cosmos"]).default("cosmos"),
  ),
  tokenDecimals: z.coerce.number().int().positive(),
  tokenName: z.string().trim().min(1),
});
