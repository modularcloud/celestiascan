import { z, preprocess } from "zod";
import { zfd } from "zod-form-data";

async function isFileAnImage(file: Blob) {
  const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result instanceof ArrayBuffer) {
        resolve(fileReader.result);
      }
    };
    fileReader.readAsArrayBuffer(file);
  });

  const first4Bytes = new Uint8Array(buffer).subarray(0, 4);
  let fileHeader = "";
  let mimeType: string | null = null;

  for (const byte of first4Bytes) {
    fileHeader += byte.toString(16);
  }

  switch (fileHeader) {
    case "89504e47": {
      mimeType = "image/png";
      break;
    }
    case "47494638": {
      mimeType = "image/gif";
      break;
    }
    case "52494646":
    case "57454250":
      mimeType = "image/webp";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      mimeType = "image/jpeg";
      break;
  }

  console.log("Header:", fileHeader);
  return mimeType !== null;
}

export const localChainFormSchema = zfd
  .formData({
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
  })
  .refine(async (data) => {
    if (data.logo) {
      return await isFileAnImage(data.logo);
    }
    return true;
  }, "The file you tried to upload is not an image.");
