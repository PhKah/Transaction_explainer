interface TxResultProps {
  descriptions: string[];
}

export default function TxResult({ descriptions }: TxResultProps) {
  if (descriptions.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      {descriptions.map((desc, i) => (
        <div
          key={i}
          className="bg-gray-100 p-3 rounded shadow-sm text-sm text-gray-800"
        >
          {desc}
        </div>
      ))}
    </div>
  );
}
