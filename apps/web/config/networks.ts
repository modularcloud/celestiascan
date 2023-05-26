import { EXPLORER_CONFIG } from "./explorers";
import { NetworkConfig } from "./types/network";

const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  // Caldera
  CALDERA_GOERLI: {
    mcId: "clo/1",
    displayName: "Goerli",
    isTestnet: true,
    isVerified: false,
    explorerId: "caldera",
    slug: "goerli",
    slugPrefix: "caldera",
    vm: "evm",
    nativeToken: "GTH",
    logoUrl: "/images/caldera.png",
    searchOptionGroup: "Caldera",
    rpcUrl: "https://eth-goerli-testnet.calderachain.xyz/replica-http",
    stack: {
      Type: "Rollup",
      Execution: "EVM",
      Settlement: "Ethereum",
      Platform: "Caldera",
    }
  },
  CALDERA_POLYGON: {
    mcId: "clo/2",
    displayName: "Polygon",
    isTestnet: true,
    isVerified: false,
    explorerId: "caldera",
    slug: "polygon",
    slugPrefix: "caldera",
    vm: "evm",
    nativeToken: "USDC",
    logoUrl: "/images/caldera.png",
    searchOptionGroup: "Caldera",
    rpcUrl: "https://usdc-polygon-testnet.calderachain.xyz/replica-http",
    stack: {
      Type: "Rollup",
      Execution: "EVM",
      Settlement: "Polygon",
      Platform: "Caldera",
    }
  },
  // Eclipse
  NAUTILUS_TRITON: {
    mcId: "eclipse/91002",
    displayName: "Triton",
    isTestnet: true,
    isVerified: false,
    explorerId: "nautilus",
    slug: "triton",
    slugPrefix: "nautilus",
    vm: "evm",
    nativeToken: "ZBC",
    logoUrl: "/images/nautilus.png",
    searchOptionGroup: "Nautilus",
    rpcUrl: "https://api.evm.zebec.eclipsenetwork.xyz/solana",
    stack: {
      Type: "Rollup",
      Execution: "EVM",
      "Data Availability": "Celestia",
      Platform: "Eclipse",
    }
  },
  ECLIPSE_WORLDS: {
    mcId: "ep/3",
    displayName: "Worlds",
    isTestnet: true,
    isVerified: false,
    explorerId: "worlds",
    slug: "worlds",
    slugPrefix: "eclipse",
    vm: "evm",
    nativeToken: "ETH",
    logoUrl: "/images/eclipse.png",
    searchOptionGroup: "Eclipse",
    rpcUrl: "https://api.evm.worlds.eclipsenetwork.xyz/solana",
    stack: {
      Type: "Rollup",
      Execution: "EVM",
      "Data Availability": "Celestia",
      Platform: "Eclipse",
    }
  },
  ECLIPSE_AEG: {
    mcId: "ep/4",
    displayName: "Aether Games",
    isTestnet: true,
    isVerified: false,
    explorerId: "aeg",
    slug: "aeg",
    slugPrefix: "eclipse",
    vm: "evm",
    nativeToken: "ETH",
    logoUrl: "/images/eclipse.png",
    searchOptionGroup: "Eclipse",
    rpcUrl: "https://api.evm.aeg.eclipsenetwork.xyz/solana",
    stack: {
      Type: "Rollup",
      Execution: "EVM",
      "Data Availability": "Celestia",
      Platform: "Eclipse",
    }
  },
  // Dymension
  DYMENSION_HUB: {
    mcId: "N/A",
    displayName: "Hub",
    isTestnet: true, // ??
    isVerified: false,
    explorerId: "dymension",
    slug: "hub",
    slugPrefix: "dymension",
    vm: "cosmos",
    nativeToken: "DYM",
    logoUrl: "/images/dymension.png",
    searchOptionGroup: "Dymension",
    rpcUrl: process.env.DYMENSION_HUB_RPC ?? "",
    stack: {
      Type: "Settlement",
      Execution: "Cosmos SDK",
      "Data Availability": "Celestia",
    }
  },
  DYMENSION_EVM_ROLLAPP: {
    mcId: "dym/2",
    displayName: "EVM RollApp",
    isTestnet: true, // ??
    isVerified: false,
    explorerId: "dymension",
    slug: "evm-rollapp",
    slugPrefix: "dymension",
    vm: "evm",
    nativeToken: "tEVMOS",
    logoUrl: "/images/dymension.png",
    searchOptionGroup: "Dymension",
    rpcUrl: "https://evmrpc-rollappevm-35c.dymension.xyz",
    stack: {
      Type: "RollApp",
      Execution: "EVM",
      Settlement: "Dymension Hub",
      "Data Availability": "Celestia",
      Platform: "Dymension",
    }
  },
  DYMENSION_ROLLAPP_X: {
    mcId: "N/A",
    displayName: "RollApp X",
    isTestnet: true, // ??
    isVerified: false,
    explorerId: "dymension",
    slug: "rollappx",
    slugPrefix: "dymension",
    vm: "cosmos",
    nativeToken: "RAX",
    logoUrl: "/images/dymension.png",
    searchOptionGroup: "Dymension",
    rpcUrl: process.env.DYMENSION_ROLLAPP_X_RPC ?? "",
    stack: {
      Type: "RollApp",
      Execution: "Cosmos SDK",
      Settlement: "Dymension Hub",
      "Data Availability": "Celestia",
      Platform: "Dymension",
    }
  },
  // Celestia
  CELESTIA_MOCHA: {
    mcId: "N/A",
    displayName: "Mocha",
    isTestnet: true,
    isVerified: false,
    explorerId: "celestia",
    slug: "mocha",
    slugPrefix: "celestia",
    vm: "cosmos",
    nativeToken: "TIA",
    logoUrl: "/images/celestia.png",
    searchOptionGroup: "Celestia",
    rpcUrl: process.env.CELESTIA_MOCHA_RPC ?? "",
    stack: {
      Type: "Data Availability",
      Execution: "Cosmos SDK",
    }
  },
  // Saga
  SAGA_ANOTHER_WORLD: {
    mcId: "sg/2",
    displayName: "Another World",
    isTestnet: true,
    isVerified: false,
    explorerId: "saga",
    slug: "another-world",
    slugPrefix: "saga",
    vm: "evm",
    nativeToken: "SAGA",
    logoUrl: "/images/saga.png",
    searchOptionGroup: "Saga",
    rpcUrl: "https://assasinscreed-1681214356120807-1.jsonrpc.sp1.sagarpc.io",
    stack: {
      Type: "Chainlet",
      Execution: "EVM",
      Security: "Cassiopeia",
      Platform: "Saga",
    }
  },
  SAGA_MODULAR_CLOUD: {
    mcId: "sg/3",
    displayName: "Modular Cloud",
    isTestnet: true,
    isVerified: false,
    explorerId: "saga",
    slug: "modular-cloud",
    slugPrefix: "saga",
    vm: "evm",
    nativeToken: "MOD",
    logoUrl: "/images/saga.png",
    searchOptionGroup: "Saga",
    rpcUrl: "https://assasinscreed-1681214356120807-1.jsonrpc.sp1.sagarpc.io",
    stack: {
      Type: "Chainlet",
      Execution: "EVM",
      Security: "Cassiopeia",
      Platform: "Saga",
    }
  },
};

const ALL_NETWORKS = Object.values(NETWORK_CONFIGS);

export function getNetworkBySlug(slug: string): NetworkConfig | undefined {
  const { id } = EXPLORER_CONFIG;
  return ALL_NETWORKS.find((network) =>
    network.explorerId === id
      ? network.slug === slug
      : `${network.slugPrefix}-${network.slug}` === slug
  );
}
