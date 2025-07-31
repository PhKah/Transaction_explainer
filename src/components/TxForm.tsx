import { useState } from "react";

interface TxFormProps {
  onSubmit: (txSig: string) => void;
}

export default function TxForm({ onSubmit }: TxFormProps) {
  const [txSig, setTxSig] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (txSig.trim()) {
      onSubmit(txSig.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="tx-input" className="block font-medium">
        Nhập Transaction Signature:
      </label>
      <input
        id="tx-input"
        type="text"
        value={txSig}
        onChange={(e) => setTxSig(e.target.value)}
        placeholder="Dán tx signature tại đây"
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Giải thích
      </button>
    </form>
  );
}
