import type { VersionedTransactionResponse, ParsedInstruction } from "@solana/web3.js";

export function parseInstructions(tx: VersionedTransactionResponse): ParsedInstruction[] {
  const message = tx?.transaction?.message as any;
  
  // Nếu có instructions dạng parsed thì ưu tiên trả về
  if (message?.instructions && Array.isArray(message.instructions)) {
    return message.instructions as ParsedInstruction[];
  }
  // Nếu có compiledInstructions (raw) thì cũng trả về luôn
  if (message?.compiledInstructions && Array.isArray(message.compiledInstructions)) {
    // Có thể phải convert sang ParsedInstruction nếu muốn hiển thị đẹp
    return message.compiledInstructions as ParsedInstruction[];
  }
  // Nếu không có gì thì trả về mảng rỗng
  return [];
}
