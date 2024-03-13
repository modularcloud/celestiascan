import "./env";
import path from "node:path";

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset: "vercel-edge",
  alias: {
    "~": path.resolve(__dirname, "./"),
  },
});
