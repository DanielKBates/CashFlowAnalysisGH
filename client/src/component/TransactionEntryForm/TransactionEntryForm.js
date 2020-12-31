import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
// *******HOOKS*******
// function TransactionEntryForm() {
//     const [dollarAmt, setDollarAmt] = useState(0);
//     const [ reoccuring, setReoccuring] = useState(false);
//     const [type, setType] = useState("");
//     const [category, setCategory] = useState(0);
// }

class TransactionEntryForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      name: "",
      dollarAmt: "",
      income: false,
      reoccuring: false,
      category: 0,
      startDate: new Date(),
      endDate: new Date(),
      modalShow: false,
      modalHover: false,
    };
  }
  onStartDateChange = (date) => {
    this.setState({ startDate: date });
  };
  onEndDateChange = (date) => {
    this.setState({ endDate: date });
  };
  handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleBools = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value === "1") return true;
      if (value === "false") return false;
      if (value === "0") return false;
    }
    return value;
  };
  handleBoolChange = (event) => {
    let boolValue = this.handleBools(event.target.value);
    const name = event.target.name;
    this.setState({
      [name]: boolValue,
    });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      modalShow: !prevState.modalShow,
    }));
  };
  toggleHover = () => {
    this.setState((prevState) => ({
      modalHover: !prevState.modalHover,
    }));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    API.saveTransaction({
      name: this.state.name,
      dollarAmt: this.state.dollarAmt,
      income: this.state.income,
      reoccuring: this.state.reoccuring,
      category: this.state.category,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });
    this.toggleModal();
    this.setState({
      name: "",
      dollarAmt: "",
      income: false,
      reoccuring: false,
      category: 0,
      startDate: new Date(),
      endDate: new Date(),
    });
    this.props.getData();
  };

  render() {
    return (
      <div>
        {this.state.modalHover ? (
          <svg
            className="bi bi-plus-circle-fill"
            width="63%"
            height="63%"
            viewBox="0 0 16 16"
            fill="orange"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.toggleModal}
            onMouseLeave={this.toggleHover}
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
            />
          </svg>
        ) : (
          <svg
            className="bi bi-plus-circle-fill"
            width="63%"
            height="63%"
            viewBox="0 0 16 16"
            fill="#48c0c0"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.toggleModal}
            onMouseEnter={this.toggleHover}
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
            />
          </svg>
        )}
        <Modal show={this.state.modalShow} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Container>
            <Row className="justify-content-md-center m-3">
              <Col md="auto">
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label>Describe this transaction:</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="dollarAmt">
                    <Form.Label>Dollar amount of transaction:</Form.Label>
                    <Form.Control
                      value={this.state.dollarAmt}
                      name="dollarAmt"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    Is this an income or an expense?
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-0">
                        <Form.Check
                          inline
                          label="Expense"
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={this.handleBoolChange}
                          name="income"
                          value={false}
                        />
                        <Form.Check
                          inline
                          label="Income"
                          type={type}
                          id={`inline-${type}-2`}
                          onChange={this.handleBoolChange}
                          name="income"
                          value={true}
                        />
                      </div>
                    ))}
                  </Form.Group>
                  <Form.Group>
                    Is this a reoccuring transaction?
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-0">
                        <Form.Check
                          inline
                          label="Yes"
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={this.handleBoolChange}
                          name="reoccuring"
                          value={true}
                        />
                        <Form.Check
                          inline
                          label="No"
                          type={type}
                          id={`inline-${type}-2`}
                          onChange={this.handleBoolChange}
                          name="reoccuring"
                          value={false}
                        />
                      </div>
                    ))}
                  </Form.Group>
                  <div className="mb-2">
                    <DatePicker
                      onChange={this.onStartDateChange}
                      name="startDate"
                      value={this.state.startDate}
                      selected={this.state.startDate}
                      customInput={
                        <span>
                          <svg
                            className="bi bi-calendar-date-fill"
                            width="7%"
                            height="7%"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm9.336 7.79c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"
                            />
                          </svg>
                          {`   ` + this.state.startDate.toDateString()}
                        </span>
                      }
                    />
                  </div>
                  {this.state.reoccuring && (
                    <div className="mt-2">
                      <DatePicker
                        onChange={this.onEndDateChange}
                        name="endDate"
                        value={this.state.endDate}
                        selected={this.state.endDate}
                        customInput={
                          <span>
                            <svg
                              className="bi bi-calendar-date-fill"
                              width="7%"
                              height="7%"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm9.336 7.79c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"
                              />
                            </svg>
                            {`   ` + this.state.endDate.toLocaleDateString()}
                          </span>
                        }
                      />
                    </div>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal>
      </div>
    );
  }
}
export default TransactionEntryForm;