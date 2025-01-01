import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";

//client should always be outside any function
const client = createPublicClient({
  chain: sepolia,
  transport: http(), //how do you want to talk to the rpc server, using which protocol
})
//libp2p is used by ipfs like http

const getBalance = async () => {
  const balance = await client.getBalance({
    address: "0xD1f6Ca8adE0962A6b172c4c03ae088329d9FdD9f",
  });
  return (Number(balance) / 10 ** 18).toString(); //n ending is a Big Int datatype, so we can convert the wei response to Number and then divide
}

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BalanceComponent />
    </QueryClientProvider>
  )
}

function BalanceComponent() {

  //queries
    const query = useQuery({
      queryKey: ["balance"],
      queryFn: getBalance,
      refetchInterval: 10 * 1000,
    });

  return <div>
    Balance: {query.data}
  </div>
}

export default App
