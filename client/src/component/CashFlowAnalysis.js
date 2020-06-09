import React from "react";
import { Line } from 'react-chartjs-2';
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TransactionEntryForm from "./TransactionEntryForm";


class CashflowAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionData: [],
        }
        this.chartReference = React.createRef();
    }
    componentDidMount() {
        this.getData();
        // this.dates = this.getDates();
        // this.buildGraph();
    }
    componentDidUpdate(prevState) {
        if (this.state.transactionData !== prevState.transactionData) {
            this.getData();
        }
    }

    getData = () => {
        let apiResultsArray = [];
        API.getTransactionData().then(res => {
            for (var i = 0; i < res.data.length; i++) {
                apiResultsArray.push(res.data[i])
            }
            this.setState({
                transactionData: apiResultsArray
            })
        })
    }
    buildGraph = () => {
        var transactions = this.state.transactionData;
        const startValue = 0;
        var balance = new Array(90).fill(0);
        //     // get transactions from data object
        //     // add values to total on all date on and after start
        for (var i = 0; i < transactions.length; i++) {
            var t = transactions[i];
            var startDate = t.startDate - 1;
            var value = t.dollarAmt;
            var sign = -1;
            if (t.income) {
                sign = 1
            };

            var l = startDate;
            var multi = new Array(90).fill(1);
            if (t.reoccurring) {
                var day = startDate;
                var j = 1;
                while (day < balance.length) {
                    if (day % t.duration === 0) {
                        j++
                    }
                    multi[day] = j
                    day++
                }
            }
            while (l < balance.length) {
                balance[l] += sign * value * multi[l];
                l++;
            }
        }
    };
    //     for (i in transactions) {
    //         var t = transactions[i];
    //         var startDate = t.startDate - 1;
    //         var value = t.dollarAmt;
    //         var sign = -1;
    //         if (t.type === 'Income') {
    //             sign = 1
    //         }

    //         var l = startDate;
    //         var multi = new Array(90).fill(1);
    //         if (t.reoccurring) {
    //             var day = startDate;
    //             var j = 1;
    //             while (day < balance.length) {
    //                 if (day % t.duration === 0) {
    //                     j++
    //                 }
    //                 multi[day] = j
    //                 day++
    //             }
    //         }
    //         while (l < balance.length) {
    //             balance[l] += sign * value * multi[l];
    //             l++;
    //         }
    //     }
    //     this.balances = balance;

    // getDates() {
    //     return this.getDateRange(new Date(2020, 3, 1), new Date(2020, 6, 1));
    // }

    // getDateRange = function (startDate, endDate) {
    //     var dates = [],
    //         currentDate = startDate,
    //         addDays = function (days) {
    //             var date = new Date(this.valueOf());
    //             date.setDate(date.getDate() + days);
    //             return date;
    //         };
    //     while (currentDate <= endDate) {
    //         dates.push(currentDate);
    //         currentDate = addDays.call(currentDate, 1);
    //     }
    //     return dates;
    // };


    render() {
        const styles = {
            bgContainer: {
                backgroundImage: "linear-gradient(to  top, #94b0b7, #c2c8c5, #ddddda)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: "100%",
            },
            transactionList: {
                display:"block",
                width: "100%",
                backgroundColor: "red"
            }
        }
        return (
            <div style={styles.bgContainer}>
                <Container>
                    <Row >
                        <Col md={10}>
                            <div className="mt-5">
                                <h3 className="text-center">Future Cashflows</h3>
                                <Line ref={this.chartReference}
                                    data={{
                                        labels: this.dates,
                                        datasets: [
                                            {
                                                data: [],
                                                borderColor: "#00c853",
                                                backgroundColor: "#ffffff",
                                                fill: true,
                                                borderWidth: 0,
                                                pointRadius: 0,
                                                hitRadius: 5,
                                                lineTension: 0
                                            }
                                        ]
                                    }}
                                    options={{
                                        maintainAspectRatio: true,
                                        legend: {
                                            display: false
                                        },
                                        scales: {
                                            xAxes: [{
                                                type: 'time',
                                                time: {
                                                    unit: 'day'
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Day'
                                                },
                                                color: 'rgba(0, 0, 0, 0)'
                                            }],
                                            yAxes: [{
                                                display: true,
                                                color: 'rgba(0, 0, 0, 0)',
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Value'
                                                }
                                            }],
                                        },
                                        hover: {
                                            intersect: true,
                                            mode: 'x'
                                        },

                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="mt-5">

                                <TransactionEntryForm />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div >
                                <ul className="mt-2 mb-2">
                                    {this.state.transactionData.map(item => (
                                        <li key={item.id}>
                                            <span>{item.startDate} | {item.name} | {item.income ? "+$" : "-$"}{item.dollarAmt}</span>
                                        </li>
                                    )

                                    )}
                                </ul>
                            </div>
                        </Col>
                    </Row>

                </Container >
            </div>
        );
    }
}
export default CashflowAnalysis









