import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TransactionEntryForm from "./TransactionEntryForm";
import "./MainChartHooks.css";

function MainChartHooks(props) {
  const [transactionData, setTransactionData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [paginationTab, setPaginationTab] = useState(0);
  const [itemsToShow] = useState(4);
  const paginationButtons = Array.from(Array(pageCount), (i, x) => x);
  const chart = () => {
    setChartData({
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "cash, yo",
          data: ["10", "30", "17", "60", "200", "670", "1100"],
          backgroundColor: ["#48c0c0"],
          borderWidth: 4,
        },
      ],
    });
  };
  const handlePagClick = (tabNumber) => {
    setPaginationTab(tabNumber);
  };
  const handlePagination = () => {
    return transactionData.slice(
      paginationTab * 4,
      paginationTab * 4 + itemsToShow
    );
  };
  const getData = () => {
    let apiResultsArray = [];
    API.getTransactionData().then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        apiResultsArray.push(res.data[i]);
      }
      apiResultsArray.sort((a, b) => a.startDate - b.startDate);
      setTransactionData(apiResultsArray);
      setPageCount(Math.ceil(transactionData.length / 4));
    });
  };
  useEffect(() => {
    getData();
    chart();
  }, [transactionData]);

  return (
    <div className="background-container">
      <Container className="main-content-wrapper">
        <Row className="main-content-area">
          <Col md={11}>
            <div className="mt-5">
              <h3 className="text-center" style={{ color: "#48c0c0" }}>
                Future Cashflows
              </h3>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  legend: {
                    labels: {
                      fontColor: "#48c0c0",
                    },
                  },
                  title: { text: "$$$", display: true, fontColor: "#48c0c0" },
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          autoSkip: true,
                          maxTicksLimit: 10,
                          beginAtZero: true,
                          fontColor: "#48c0c0",
                        },
                      },
                    ],
                    xAxes: [
                      {
                        ticks: {
                          autoSkip: true,
                          maxTicksLimit: 10,
                          beginAtZero: true,
                          fontColor: "#48c0c0",
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </Col>
          <Col md={1}>
            <div className="mt-5 p-0">
              <TransactionEntryForm />
            </div>
          </Col>
        </Row>
        <Row className="main-content-area">
          <Col md={12}>
            <div className="transaction-list-wrapper">
              <ul className="transaction-list mt-2">
                {handlePagination().map((item, i) => (
                  <li className="transaction-list-items" key={i}>
                    <span className="transaction-li">
                      {item.startDate} | {item.name} |{" "}
                      {item.income ? "+ $" : "- $"}
                      {item.dollarAmt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>

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
      </Container>
    </div>
  );
}
export default MainChartHooks;
