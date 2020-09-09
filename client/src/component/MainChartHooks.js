import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TransactionEntryForm from "./TransactionEntryForm";
import "./Stylesheet.css";

function MainChartHooks(props) {
    const [transactionData, setTransactionData] = useState([]);
    const [chartData, setChartData] = useState({});
    const chart = () => {
        setChartData({
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [
                {
                    label: "cash, yo",
                    data: ["10", "30", "17", "60", "200", "670", "1100"],
                    backgroundColor: [
                        "#48c0c0"
                    ],
                    borderWidth: 4,
                }
            ]
        });
    };
    useEffect(() => {
        let apiResultsArray = [];
        API.getTransactionData().then(res => {
            for (var i = 0; i < res.data.length; i++) {
                apiResultsArray.push(res.data[i])
            }
            setTransactionData(apiResultsArray)
            console.log(transactionData)
            chart();
        });
    }, [transactionData]);
    const styles = {
        bgContainer: {
            backgroundImage: "linear-gradient(to top, #55596f,#303343, #272938)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: "100%",
        },
        transactionListWrapper: {
            display: "block",
            width: "75%",
            margin: "auto",
            marginBottom: "4%",
            marginTop: "2%",
            height: "400px",
            overflow: "auto"
        },
        transactionList: {

        },
        transactionListItems: {
            padding: "3%",
            listStyleType: "none",
            borderBottom: "2px solid black",
            width: "50%",
            textAlign: "center",
        },
        mainContentWrapper: {
            paddingTop: "3%",
            paddingBottom: "3%"
        },
        mainContentArea: {
            backgroundColor: "#191927",
            borderRadius: "1%"
        }
    };
    return (
        <div style={styles.bgContainer}>
            <Container>
                <div style={styles.mainContentWrapper} >
                    <Row style={styles.mainContentArea}>
                        <Col md={11}>
                            <div className="mt-5">
                                <h3 className="text-center" style={{ color: "#48c0c0" }}>Future Cashflows</h3>
                                <Line data={chartData}
                                    options={{
                                        responsive: true,
                                        legend: {
                                            labels: {
                                                fontColor: "#48c0c0"
                                            }
                                        },
                                        title: { text: "$$$", display: true, fontColor: "#48c0c0" },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    autoSkip: true,
                                                    maxTicksLimit: 10,
                                                    beginAtZero: true,
                                                    fontColor: "#48c0c0"
                                                }
                                            }],
                                            xAxes: [{
                                                ticks: {
                                                    autoSkip: true,
                                                    maxTicksLimit: 10,
                                                    beginAtZero: true,
                                                    fontColor: "#48c0c0"
                                                }
                                            }]
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className="mt-5 p-0" >
                                <TransactionEntryForm />
                            </div>
                        </Col>
                    </Row>

                    <Row >
                        <Col>
                            <div style={styles.transactionListWrapper} >
                                <ul className="mt-2" style={styles.transactionList} >
                                    {transactionData.sort((a, b) => a.startDate - b.startDate).map(item => (
                                        <li style={styles.transactionListItems} key={item.id}>
                                            <span>{item.startDate} | {item.name} | {item.income ? "+ $" : "- $"}{item.dollarAmt}</span>
                                        </li>
                                    )
                                    )}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container >
        </div>
    );
};
export default MainChartHooks;