import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount, useBalance, WagmiProvider } from "wagmi";
import * as React from "react";
import { useConnect } from "wagmi";
// import { config } from "./config"; //as we are defining the config here itself and not as a separate component as given in the notion docs 
import { http, createConfig } from "wagmi";
import { sepolia, base, mainnet, optimism } from "wagmi/chains";
import {
  injected,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";

import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { sendTransaction } from "viem/actions";

const projectId = "<WALLETCONNECT_PROJECT_ID>"; //this is done as base is slightly weird

export const config = createConfig({
  autoConnect: true, // Optional: Automatically reconnect the wallet on reload
  chains: [sepolia, mainnet, base, optimism], //these are the chains you support
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()], //these are the wallets you support and if they don't have these wallets, when the option is clicked they go to the wallet's page and can be downloaded from there
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const MyAddress = () => {
  const { address } = useAccount(); //this is another wagmi hook
  const {
    data: balance,
    isLoading,
    isError,
    error,
  } = useBalance({
    address,
    chainId: sepolia.id, // Ensure the correct chain ID is used
  });

    // Loading and error handling
    if (isLoading) return <div>Loading balance...</div>;
    if (isError) return <div>Error fetching balance: {error.message}</div>;
  return (
    <div>
      Present connected address: {address || "Not connected"}
      <br />
      Present Balance: {balance?.formatted || "Balance not available"} ETH
    </div>
  );
}

const WalletConnector = () => {
  // connectors is an array of the wallets
  const { connectors, connect } = useConnect(); //here useConnect is the first Wagmi hook we are using

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}

const EthSend = () => {

  const { data: hash, sendTransaction } = useSendTransaction(); //another wagmi hook

  const sendEth = () => {
    sendTransaction({
      to: document.getElementById('address').value, //need to use refs instead of ids as it is the cleaner way
      value: '10000000000000000' //16 zeroes means 0,.01 eth, and 17 means 0.1 eth
    })
  }

  return <div>
    <input id="address" type="text" placeholder="Address..." />
    <button onClick={sendEth}>Send 0.01 ETH</button>
    This is the previous transaction hash {hash}
  </div>
}

export default App;
