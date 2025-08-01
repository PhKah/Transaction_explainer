// src/components/TxBillCard.tsx
import React from "react";

interface TxBill {
  title: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  time: string;
  program: string;
}

interface TxBillCardProps {
  bill: TxBill;
}

const TxBillCard: React.FC<TxBillCardProps> = ({ bill }) => {
  return (
    <div className="card">
      <h3>{bill.title}</h3>
      <p><b>Từ ví:</b> {bill.from}</p>
      <p><b>Đến ví:</b> {bill.to}</p>
      <p><b>Số lượng:</b> {bill.amount} {bill.token}</p>
      <p><b>Thời gian:</b> {bill.time}</p>
      <p><b>Chương trình:</b> {bill.program}</p>
    </div>
  );
};

export default TxBillCard;
