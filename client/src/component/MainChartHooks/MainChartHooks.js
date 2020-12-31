import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TransactionEntryForm from "../TransactionEntryForm/TransactionEntryForm";
import TransactionList from "../TransactionList/TransactionList";
import UpcomingTrans from "../UpcomingTrans/UpcomingTrans"
import "./MainChartHooks.css";

function MainChartHooks(props) {
  const [transactionData, setTransactionData] = useState([]);
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "cash",
          data: ["10", "30", "17", "60", "200", "670", "1100"],
          backgroundColor: ["#48c0c0"],
          borderWidth: 4,
        },
      ],
    });
  };
 
  const getData = useCallback( () => {
    let apiResultsArray = [];
    API.getTransactionData()
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        apiResultsArray.push(res.data[i]);
      }
      apiResultsArray.sort((a, b) => a.startDate - b.startDate);
      setTransactionData(apiResultsArray);
    });
  },[transactionData]
  );
 
  useEffect(() => {
    getData();
    chart();
  }, [transactionData.length]);

  return (
    <div className="background-container">
      <Container className="main-content-wrapper">
        <Row className="chart-row">
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
              <TransactionEntryForm getData={getData}/>
            </div>
          </Col>
        </Row>
        <Row className="list-row">
          <Col md={6}>
            <TransactionList transactions={transactionData} />
          </Col>
          <Col md={6}>
            <UpcomingTrans transactions={transactionData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default MainChartHooks;
