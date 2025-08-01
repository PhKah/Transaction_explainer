import { Connection } from "@solana/web3.js";

const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=c5f39997-104f-444e-83a0-318633a8aa5e"
);

export async function fetchTransaction(txSig: string) {
  return await connection.getTransaction(txSig, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });
}
