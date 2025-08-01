const HELIUS_ENDPOINT = "https://mainnet.helius-rpc.com/?api-key=c5f39997-104f-444e-83a0-318633a8aa5e";

// 🔍 Lấy metadata của token (name, symbol, verified...) từ Helius
export async function checkTokenMetadata(mint: string) {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=c5f39997-104f-444e-83a0-318633a8aa5e`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mintAccounts: [mint] }),
    });

    if (!res.ok) throw new Error("Helius API error");

    const data = await res.json();
    return data?.[0] || null;
  } catch (e) {
    console.error("[Helius] Metadata error:", e);
    return null;
  }
}

// 🛡️ Kiểm tra program (địa chỉ smart contract) có tồn tại, uy tín không
export async function checkProgramInfo(programId: string) {
  try {
    const url = `${HELIUS_ENDPOINT}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params: [programId, { encoding: "jsonParsed" }],
      }),
    });

    const data = await res.json();
    return data?.result?.value || null;
  } catch (e) {
    console.error("[Helius] Program check failed:", e);
    return null;
  }
}
