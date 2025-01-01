import { useAccount, useBalance } from "wagmi";
import { useRef, useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export function SendETH(){
    const { address } = useAccount();
    const { data: hash, sendTransaction } = useSendTransaction();

    const receiverAddressRef = useRef(null);

    const value = '0.01'; //this value should always be stored as a string

    const handleSendETH = () => {
        const receiverAddress = receiverAddressRef.current.value;
        try {
            sendTransaction({ to: receiverAddress, value: parseEther(value) });
        }catch(error){
            console.error("Transaction failed:", error);
        }
    }

    if (!address) return null;
    return (
      <div>
        <h3>Send ETH</h3>
        <input type="text" placeholder="0xA0Cf…251e" ref={receiverAddressRef} />
        <button onClick={handleSendETH}>Send 0.01 ETH</button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </div>
    );
}