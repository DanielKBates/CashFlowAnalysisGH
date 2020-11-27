import React, { useState, useEffect } from "react";
import "./UpcomingTrans.css";

function UpcomingTrans(props) {
  const [pageCount, setPageCount] = useState(0);
  const [paginationTab, setPaginationTab] = useState(0);
  const paginationButtons = Array.from(Array(pageCount), (i, j) => j);
  const handleDataProp = () => {
    setPageCount(Math.ceil(props.transactions.length / 4));
    console.log({props});

  };
  const handlePagClick = (tabNumber) => {
    setPaginationTab(tabNumber);
  };
  const handlePagination = () => {
    return props.transactions.slice(
      paginationTab * 4,
      paginationTab * 4 + 4
    );
  };

  useEffect(()=> {
      handleDataProp();
  },[props])

  return (
    <div>
      <div className="upcoming-list-wrapper">
        <ul className="upcoming-list mt-2">
          {handlePagination().map((item, i) => (
            <li className="upcoming-list-items" key={i}>
              <span className="upcoming-li">
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
export default UpcomingTrans;
