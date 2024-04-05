// @ts-check
require("./env.js");

/** @type {import('next').NextConfig} */
const config = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/celestia-mainnet",
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ["service-manager"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 31_536_000, // One year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nautchain.xyz",
      },
      {
        protocol: "https",
        hostname: "mc-nft.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "mc-config.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

module.exports = config;
