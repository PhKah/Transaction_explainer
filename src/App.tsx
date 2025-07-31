import { useState } from "react";
import TxForm from "./components/TxForm";
import TxResult from "./components/TxResult";
import { fetchTransaction } from "./utils/fetchTx";
import { parseInstructions } from "./utils/parseTx";
import { explainInstruction } from "./utils/explainTx";
import type { VersionedTransactionResponse } from "@solana/web3.js";

import "./App.css";

function App() {
  const [descriptionList, setDescriptionList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTxSubmit = async (txSig: string) => {
    setLoading(true);
    setError(null);
    setDescriptionList([]);

    try {
      const tx: VersionedTransactionResponse | null = await fetchTransaction(txSig);


      if (!tx) {
        setError("❌ Không tìm thấy giao dịch hoặc lỗi kết nối RPC.");
        return;
      }

      const instructions = parseInstructions(tx);
      if (instructions.length === 0) {
        setDescriptionList(["⚠️ Giao dịch không chứa instruction."]);
        return;
      }

      const explained = instructions.map((ix) => explainInstruction(ix));
      setDescriptionList(explained);
    } catch (e) {
      console.error("Lỗi khi xử lý giao dịch:", e);
      setError("❌ Đã xảy ra lỗi khi xử lý giao dịch.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Transaction Explainer</h1>

      <TxForm onSubmit={handleTxSubmit} />

      {loading && <p className="text-blue-500 mt-4">Đang phân tích giao dịch...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <TxResult descriptions={descriptionList} />
    </div>
  );
}

export default App;
