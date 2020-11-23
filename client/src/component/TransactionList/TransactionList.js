import React, { useState, useEffect } from "react";
import "./TransactionList.css";

function TransactionList(transactions) {
  const [transData, setTransData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [paginationTab, setPaginationTab] = useState(0);
  const [itemsToShow] = useState(4);
  const paginationButtons = Array.from(Array(pageCount), (i, x) => x);
  const handleData = () => {
    let tList = [];
    for (var i = 0; i < transactions.transactions.length; i++) {
      tList.push(transactions.transactions[i]);
    }
    tList.sort((a, b) => a.startDate - b.startDate);
    setTransData(tList);
    setPageCount(Math.ceil(transData.length / 4));
   

  };
  const handlePagClick = (tabNumber) => {
    setPaginationTab(tabNumber);
  };
  const handlePagination = () => {
    return transData.slice(paginationTab * 4, paginationTab * 4 + itemsToShow);
  };

useEffect(() => {
    handleData();
})

  return (
    <div>
      <div className="transaction-list-wrapper">
        <ul className="transaction-list mt-2">
          {handlePagination().map((item, i) => (
            <li className="transaction-list-items" key={i}>
              <span className="transaction-li">
                {item.startDate} | {item.name} | {item.income ? "+ $" : "- $"}
                {item.dollarAmt}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination-wrapper">
        <div className="pagination">
          {paginationButtons.map((tabNumber) => {
            return (
              <button
                className="pagination-buttons"
                href="#"
                key={tabNumber}
                onClick={() => handlePagClick(tabNumber)}
              >
                {tabNumber + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default TransactionList;
