/* eslint-disable turbo/no-undeclared-env-vars */
// @ts-check
const { preprocess, z } = require("zod");
const { createEnv } = require("@t3-oss/env-nextjs");

const env = createEnv({
  server: {
    DEPLOYMENT_WEBHOOK_SECRET: z.string().optional(),
    ROOT_USER_PATH: z.string().optional().default(""),
    GITHUB_ACTION_TRIGGER_PERSONAL_ACCESS_TOKEN: z.string().optional(),
    NAMESPACE_ENDPOINT: z.string().url().optional(),
    BLOB_READ_WRITE_TOKEN: z.string().optional(),
    ALT_BASE_URL: z.string().url().optional(),
    INTERNAL_INTEGRATION_API_URL: z.string().url(),
    REVALIDATE_TOKEN: z.string().min(32).optional(),
    CRON_SECRET: z.string().min(32).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    RESEND_EMAIL_SENDER: z.string().email().optional(),
    RESEND_EMAIL_RECEIVER: z.string().email().optional(),
    SVM_DEVNET_RPC_ALTERNATIVE: z.string().url().optional(),
    POSTGRES_URL: z.string().optional(),
    POSTGRES_PRISMA_URL: z.string().optional(),
    POSTGRES_URL_NON_POOLING: z.string().optional(),
    POSTGRES_USER: z.string().optional(),
    POSTGRES_HOST: z.string().optional(),
    POSTGRES_PASSWORD: z.string().optional(),
    POSTGRES_DATABASE: z.string().optional(),
    CELESTIA_MAINNET_BACKUP_NODE: z.string().optional(),
    VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  client: {
    NEXT_PUBLIC_TARGET: z.enum(["web", "electron"]).default("web"),
    NEXT_PUBLIC_PRODUCTION_URL: z
      .string()
      .url()
      .optional()
      .default("https://explorer.modular.cloud"),
    NEXT_PUBLIC_ADOBE_EMBED_API_KEY: z.string(),
    NEXT_PUBLIC_SVM_METRICS: z.string().url(),
    // add scheme to VERCEL_URL
    NEXT_PUBLIC_VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
    INTERNAL_INTEGRATION_API_URL: process.env.INTERNAL_INTEGRATION_API_URL,
    NAMESPACE_ENDPOINT: process.env.NAMESPACE_ENDPOINT,
    ALT_BASE_URL: process.env.ALT_BASE_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_EMAIL_SENDER: process.env.RESEND_EMAIL_SENDER,
    RESEND_EMAIL_RECEIVER: process.env.RESEND_EMAIL_RECEIVER,
    NEXT_PUBLIC_SVM_METRICS: process.env.NEXT_PUBLIC_SVM_METRICS,
    SVM_DEVNET_RPC_ALTERNATIVE: process.env.SVM_DEVNET_RPC_ALTERNATIVE,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    CRON_SECRET: process.env.CRON_SECRET,
    CELESTIA_MAINNET_BACKUP_NODE: process.env.CELESTIA_MAINNET_BACKUP_NODE,
    NEXT_PUBLIC_ADOBE_EMBED_API_KEY:
      process.env.NEXT_PUBLIC_ADOBE_EMBED_API_KEY,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    NEXT_PUBLIC_TARGET: process.env.NEXT_PUBLIC_TARGET,
    DEPLOYMENT_WEBHOOK_SECRET: process.env.DEPLOYMENT_WEBHOOK_SECRET,
    GITHUB_ACTION_TRIGGER_PERSONAL_ACCESS_TOKEN:
      process.env.GITHUB_ACTION_TRIGGER_PERSONAL_ACCESS_TOKEN,
    ROOT_USER_PATH: process.env.ROOT_USER_PATH,
  },
});

module.exports = {
  env,
};
