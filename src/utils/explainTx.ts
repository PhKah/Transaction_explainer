import type { ParsedInstruction } from "@solana/web3.js";
import { checkTokenMetadata } from "../utils/checkMetadata";

export async function explainInstruction(ix: ParsedInstruction): Promise<string> {
  const program = ix.program;
  const type = ix.parsed?.type;
  const info = ix.parsed?.info;

  // 1. TRANSFER SOL
  if (program === "system" && type === "transfer") {
    return `✅ Bạn đang chuyển ${info.lamports / 1e9} SOL đến ví “${info.destination}”.`;
  }

  // 2. TRANSFER TOKEN (SPL)
  if (program === "spl-token" && type === "transfer") {
    const meta = await checkTokenMetadata(info.mint);
    const name = meta?.onChainMetadata?.metadata?.name || "token";
    return `✅ Bạn đang chuyển ${info.amount} ${name} từ tài khoản “${info.source}” đến “${info.destination}”.`;
  }

  // 3. APPROVE TOKEN (ủy quyền spender)
  if (program === "spl-token" && type === "approve") {
    const amount = BigInt(info.amount || 0);
    const dangerThreshold = 1000000000000n;
    const warning = amount > dangerThreshold ? "\n⚠️ CẢNH BÁO: Bạn đang cấp quyền cho ví khác rút một lượng lớn token từ tài khoản của bạn." : "";
    return `ℹ️ Bạn đang ủy quyền cho địa chỉ “${info.delegate}” được rút tối đa ${info.amount} token từ tài khoản “${info.source}”.${warning}`;
  }

  // 4. SET AUTHORITY
  if (program === "spl-token" && type === "setAuthority") {
    return `⚠️ Bạn đang thay đổi quyền kiểm soát của tài khoản/token “${info.account}” về địa chỉ “${info.newAuthority}”. Hãy chắc chắn bạn tin tưởng địa chỉ này.`;
  }

  // 5. CLOSE ACCOUNT
  if (program === "spl-token" && type === "closeAccount") {
    return `❌ Bạn đang đóng tài khoản token “${info.account}” và chuyển SOL về ví “${info.destination}”.`;
  }

  return "An toàn";
}
