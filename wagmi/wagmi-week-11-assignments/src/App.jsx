import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from './config/WalletConfig';
import { WagmiProvider } from "wagmi";
import { WalletConnector } from './components/WalletConnector'
import { UserBalance } from "./components/UserBalance";
import { SendETH } from './components/SendETH';
import { ReceiveETH } from "./components/ReceiveETH";

const queryClient = new QueryClient();

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
				<WalletConnector />
				<UserBalance />
				<SendETH />
				<ReceiveETH />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
