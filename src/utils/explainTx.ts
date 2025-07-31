import type { ParsedInstruction } from "@solana/web3.js";

export function explainInstruction(ix: ParsedInstruction): string {
  if (ix.program === "system" && ix.parsed?.type === "transfer") {
    const info = ix.parsed.info;
    return `Bạn đang gửi ${info.lamports / 1e9} SOL tới ${info.destination}`;
  }

  return "Giao dịch chưa hỗ trợ.";
}