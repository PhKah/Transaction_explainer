import { Connection } from "@solana/web3.js";

// Nhận signature từ dòng lệnh (node test.ts <signature>)
const SIG = process.argv[2];

if (!SIG) {
  console.error("Hãy truyền signature trên dòng lệnh. Ví dụ:");
  console.error("npx ts-node --transpile-only test.ts <signature>");
  process.exit(1);
}

const RPC = "https://api.mainnet-beta.solana.com";

async function main() {
  const conn = new Connection(RPC);

  // Nhớ dùng encoding jsonParsed để dễ xem!
  const tx = await conn.getTransaction(SIG, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
    // encoding: "jsonParsed"   // Thêm nếu thích
  });

  if (!tx) {
    console.log("Không tìm thấy transaction!");
    return;
  }

  // Lấy instructions
  const instructions =
    (tx.transaction).message.instructions ||
    (tx.transaction).message.compiledInstructions || [];

  if (!instructions || instructions.length === 0) {
    console.log("Không có instruction nào trong giao dịch này.");
    return;
  }

  instructions.forEach((ix, i ) => {
    if (ix.parsed) {
      console.log(`--- Instruction ${i + 1} ---`);
      console.log("Program:", ix.program);
      console.log("Type:", ix.parsed.type);
      console.log("Info:", JSON.stringify(ix.parsed.info, null, 2));
    } else {
      console.log(`--- Instruction ${i + 1} (raw) ---`);
      console.log(ix);
    }
  });
}

main();
