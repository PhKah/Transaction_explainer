import React from "react";

interface TxResultProps {
  descriptions: string[];
}

function getIconPrefix(text: string): string {
  if (text.startsWith("✅")) return "✅";
  if (text.startsWith("⚠️")) return "⚠️";
  if (text.startsWith("❌")) return "❌";
  if (text.startsWith("ℹ️")) return "ℹ️";
  return "🔎";
}

function getColorClass(icon: string): string {
  switch (icon) {
    case "✅": return "tx-safe";
    case "⚠️": return "tx-warning";
    case "❌": return "tx-danger";
    case "ℹ️": return "tx-info";
    default: return "tx-default";
  }
}

const TxResult: React.FC<TxResultProps> = ({ descriptions }) => {
  if (descriptions.length === 0) return null;

  return (
    <div className="tx-result">
      {descriptions.map((desc, i) => {
        const icon = getIconPrefix(desc);
        const message = desc.replace(/^[✅⚠️❌ℹ️]/, "").trim();
        const colorClass = getColorClass(icon);

        return (
          <div key={i} className={`tx-card ${colorClass}`}>
            <span className="emoji-prefix" title={icon}>{icon}</span>
            <span className="tx-message">{message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TxResult;
