import { useState } from "react";
import TxForm from "./components/TxForm";
import TxResult from "./components/TxResult";
import { fetchTransaction } from "./utils/fetchTx";
import { parseInstructions } from "./utils/parseTx";
import { explainInstruction } from "./utils/explainTx";
import type { VersionedTransactionResponse } from "@solana/web3.js";
import TxBillCard from "./components/TxBillCard";
import { explainAsBill } from "./utils/explainAsBill";

import "./App.css";

function App() {

  const [descriptionList, setDescriptionList] = useState<string[]>([]);
  const half = Math.ceil(descriptionList.length / 2);
  const leftDescriptions = descriptionList.slice(0, half);
  const rightDescriptions = descriptionList.slice(half);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bill, setBill] = useState<any>(null);

  const handleTxSubmit = async (txSig: string) => {
    setLoading(true);
    setError(null);
    setDescriptionList([]);

    try {
      const tx: VersionedTransactionResponse | null = await fetchTransaction(
        txSig
      );

      if (!tx) {
        setError("❌ Không tìm thấy giao dịch hoặc lỗi kết nối RPC.");
        return;
      }

      const instructions = parseInstructions(tx);
      if (instructions.length === 0) {
        setDescriptionList(["⚠️ Giao dịch không chứa instruction."]);
        return;
      }

      const explained = await Promise.all(
        instructions.map((ix) => explainInstruction(ix))
      );
      setDescriptionList(explained);
      setBill(explainAsBill(tx));
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
      <h1 className="text-2xl font-bold mb-6 text-center">
        Transaction Explainer
      </h1>
      <TxForm onSubmit={handleTxSubmit} />
      {loading && (
        <div className="w-full flex text-center mt-4">
          <p className="text-blue-500">Đang phân tích giao dịch...</p>
        </div>
      )}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="result-section flex gap-4 mt-4">
        <div className="result-column flex-1">
          {bill && <TxBillCard bill={bill} />}
        </div>
        <div className="result-column flex-1">
          {/* Chia mô tả thành 2 phần, mỗi bên 1 cột */}
          <div className="flex gap-4">
            <div className="flex-1">
              <TxResult descriptions={leftDescriptions} />
            </div>
            <div className="flex-1">
              <TxResult descriptions={rightDescriptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
