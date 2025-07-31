import type { VersionedTransactionResponse, ParsedInstruction } from "@solana/web3.js";

export function parseInstructions(tx: VersionedTransactionResponse): ParsedInstruction[] {
  const message = tx?.transaction?.message as any;

  if (!message?.instructions) return [];

  return message.instructions as ParsedInstruction[];
}
