import { fileTypeFromBuffer } from "file-type";
import { z, preprocess } from "zod";
import { zfd } from "zod-form-data";

async function readFileAsBuffer(file: File) {
  return await new Promise<ArrayBuffer>((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result instanceof ArrayBuffer) {
        resolve(fileReader.result);
      }
    };
    fileReader.readAsArrayBuffer(file);
  });
}

export const localChainFormSchema = z
  .object({
    chainName: z.string().min(1),
    namespace: z.string().optional(),
    startHeight: z.string().optional(),
    daLayer: z.string().optional(),
    logo: z.instanceof(File).optional(),
    rpcUrl: z.string().url(),
    rpcPlatform: preprocess(
      (arg) => (typeof arg === "string" ? arg.toLowerCase() : arg),
      z.enum(["cosmos"]).default("cosmos"),
    ),
    tokenDecimals: z.coerce.number().int().positive(),
    tokenName: z.string().min(1),
  })
  .refine(async (data) => {
    if (data.logo) {
      console.log({
        dataLogo: data.logo,
      });
      const fileType = await fileTypeFromBuffer(
        await readFileAsBuffer(data.logo),
      );
      return fileType && fileType.mime.startsWith("image/");
    }
    return true;
  }, "The file you tried to upload is not an image.");
