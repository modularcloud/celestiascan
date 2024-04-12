import { z, preprocess } from "zod";

export const localChainFormSchema = z.object({
  chainName: z.string().trim().min(1),
  namespace: z.string().trim().optional(),
  startHeight: z.coerce.number().int().optional(),
  daLayer: z.string().trim().optional(),
  logo: z
    .string()
    .regex(/^data:image\/([a-zA-Z]+);base64,/, "Please upload a valid image")
    .nullish(),
  rpcUrl: z.string().trim().url(),
  rpcPlatform: preprocess(
    (arg) => (typeof arg === "string" ? arg.toLowerCase() : arg),
    z.enum(["cosmos"]).default("cosmos"),
  ),
  tokenDecimals: z.coerce.number().int().positive(),
  tokenName: z.string().trim().min(1),
});
