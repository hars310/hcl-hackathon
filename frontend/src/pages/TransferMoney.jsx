import { useState } from "react";
import axios from "axios";

function TransferMoney() {
  const [fromBIC, setFromBIC] = useState("");
  const [toBIC, setToBIC] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleTransfer = async (method) => {
    setLoading(true);
    setData(null);

    let apiUrl = method === "cheapest" 
      ? "http://localhost:3000/api/transactions/transfer/cheapest"
      : "http://localhost:3000/api/transactions/transfer/fastest";

    try {
      const response = await axios.post(apiUrl, {
        FromBIC: fromBIC,
        ToBIC: toBIC,
        amount
      });

      if (response.status === 200) {
        setData(response.data);
      } else {
        alert("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing transfer.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Transfer Money</h1>
      <input
        placeholder="From BIC"
        value={fromBIC}
        onChange={(e) => setFromBIC(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />
      <input
        placeholder="To BIC"
        value={toBIC}
        onChange={(e) => setToBIC(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />
      <div className="flex gap-4 mt-2">
        <button onClick={() => handleTransfer("cheapest")} className="bg-zinc-900 text-white px-4 py-2 rounded">
           Cheapest Charges
        </button>
        <button onClick={() => handleTransfer("fastest")} className="bg-zinc-900 text-white px-4 py-2 rounded">
          Fastest Time
        </button>
      </div>

      {data && (
        <div className="mt-4 p-4 bg-white border rounded w-1/2">
          <h2 className="text-lg font-bold">Transfer Details:</h2>
          <p>Path: {data.result?.path.join(" → ")}</p>
          <p>{data.result?.timeTaken ? `Time Taken: ${data.result.timeTaken} minutes` : `Total Charge: ${data.result.totalCharge}`}</p>
        </div>
      )}
    </div>
  );
}

export default TransferMoney;
