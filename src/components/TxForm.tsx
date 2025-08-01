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
  // Cập nhật form thành:
<form onSubmit={handleSubmit} className="form-container">
  <p className="subtitle">
    Hiểu rõ giao dịch Solana trước khi ký. Giảm rủi ro bảo vệ tài sản.
  </p>

  <div className="input-row">
    <label htmlFor="tx-input" className="input-label">
      Nhập Transaction Signature:
    </label>
    <input
      id="tx-input"
      type="text"
      value={txSig}
      onChange={(e) => setTxSig(e.target.value)}
      placeholder="Dán tx signature tại đây"
      className="input-field"
    />
  </div>

  <button type="submit" className="submit-btn">
    Giải thích
  </button>
</form>
  );
}
