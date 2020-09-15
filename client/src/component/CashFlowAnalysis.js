import React from "react";
import { Line } from "react-chartjs-2";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TransactionEntryForm from "./TransactionEntryForm";
import "./Stylesheet.css";

class CashflowAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: [],
    };
    this.chartReference = React.createRef();
  }
  componentDidMount() {
    console.log(this.chartReference);
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
    API.getTransactionData().then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        apiResultsArray.push(res.data[i]);
      }
      this.setState({
        transactionData: apiResultsArray,
      });
    });
  };
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
        sign = 1;
      }

      var l = startDate;
      var multi = new Array(90).fill(1);
      if (t.reoccurring) {
        var day = startDate;
        var j = 1;
        while (day < balance.length) {
          if (day % t.duration === 0) {
            j++;
          }
          multi[day] = j;
          day++;
        }
      }
      while (l < balance.length) {
        balance[l] += sign * value * multi[l];
        l++;
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
    buildGraph = () => {}
    

    render() {
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
            mainContentWrapper:{
                paddingTop:"3%",
                paddingBottom:"3%"
            },
            mainContentArea: {
                backgroundColor: "#191927",
                borderRadius:"1%"
            }
        };
        return (
            <div style={styles.bgContainer}>
                <Container>
                    <div style={styles.mainContentWrapper} >
                        <Row style={styles.mainContentArea}>
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

                        <Row >
                            <Col>
                                <div style={styles.transactionListWrapper} >
                                    <ul className="mt-2" style={styles.transactionList} >
                                        {this.state.transactionData.sort((a, b) => a.startDate - b.startDate).map(item => (
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
    }
}
export default CashflowAnalysis;
