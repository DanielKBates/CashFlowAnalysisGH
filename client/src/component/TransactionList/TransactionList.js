import React, { useState, useEffect } from "react";
import "./TransactionList.css";

function TransactionList(props) {
  const [pageCount, setPageCount] = useState(0);
  const [paginationTab, setPaginationTab] = useState(0);
  const paginationButtons = Array.from(Array(pageCount), (i, j) => j);

  const handlePagClick = (tabNumber) => {
    setPaginationTab(tabNumber);
  };
  const handlePagination = () => {
    return props.transactions.slice(paginationTab * 4, paginationTab * 4 + 4);
  };

  useEffect(() => {
    const handleDataProp = () => {
      setPageCount(Math.ceil(props.transactions.length / 4));
    };
    handleDataProp();
  }, [props.transactions.length]);

  return (
    <div>
      <div className="transaction-list-wrapper">
        <h5 className="list-title">Transaction History</h5>
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
