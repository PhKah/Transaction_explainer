// src/utils/explainAsBill.ts
import type { VersionedTransactionResponse } from "@solana/web3.js";

export function explainAsBill(tx: VersionedTransactionResponse) {
  // Giả lập parse, bạn hãy cải tiến theo logic thực tế:
  const message = tx.transaction.message as any;
  const firstIx = (message.instructions && message.instructions.length > 0)
  ? message.instructions[0]
  : (message.compiledInstructions && message.compiledInstructions.length > 0)
  ? message.compiledInstructions[0]
  : null;

  return {
    title: "🔁 Chuyển tiền",
    from: tx.transaction.message.staticAccountKeys[0]?.toBase58() || "N/A",
    to: firstIx.parsed?.info?.destination || "N/A",
    amount: (firstIx.parsed?.info?.lamports || 0) / 1e9,
    token: firstIx.program === "system" ? "SOL" : "Token",
    time: tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : "Đang xử lý...",
    program: firstIx.program || "N/A",
  };
}
