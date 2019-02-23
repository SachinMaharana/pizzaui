import React from "react";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import axios from "axios-https-proxy-fix";

const options = [
  { value: "veg", label: "Veg Pizza" },
  { value: "nonveg", label: "Non Veg Pizza" }
];

export default class Choice extends React.Component {
  state = {
    kind: null,
    name: "",
    contact: "",
    contactType: "email",
    pizzaType: "",
    message: "",
    status: ""
  };
  handleChange = kind => {
    let pizzaType = kind.value;
    this.setState({
      kind,
      pizzaType: pizzaType
    });
    console.log(`Option selected:`, kind.value);
  };
  handleNameChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleContactChange = contact => event => {
    this.setState({
      [contact]: event.target.value
    });
  };

  handleRadioChange = event => {
    this.setState({ contactType: event.target.value, contact: "" });
  };
  handleOrder = () => {
    const { name, contact, pizzaType, contactType } = this.state;
    let url = `http://localhost:5000/buy_pizza?pizzatype=${pizzaType}&contact=${contact}&name=${name}&contactType=${contactType}`;
    axios
      .post(url, null, {
        "Content-Type": "application/json"
      })
      .then(res => {
        if (res.status === 202) {
          this.setState({
            message: "Order accepted.",
            status: ""
          });
        }
      })
      .catch(err => console.log(err.response));
  };
  handleStatus = () => {
    const { name } = this.state;
    let url = `http://localhost:5000/get_status?name=${name}`;
    axios
      .get(url, null, {
        "Content-Type": "application/json"
      })
      .then(res => {
        if (res.status === 202) {
          this.setState({
            status: res.data
          });
        }
      })
      .catch(err => console.log(err.response));
  };

  render() {
    const { kind } = this.state;

    return (
      <div>
        <Select value={kind} onChange={this.handleChange} options={options} />
        <div style={{ marginTop: "60px" }}>
          <TextField
            id="name"
            label="Name"
            placeholder="Name"
            margin="normal"
            variant="filled"
            value={this.state.name}
            onChange={this.handleNameChange("name")}
          />
        </div>
        <div>
          <h3>Contact Type</h3>
          <RadioGroup
            aria-label="Contact Type"
            name="Contatc"
            value={this.state.contactType}
            onChange={this.handleRadioChange}
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="phone" control={<Radio />} label="Phone" />
          </RadioGroup>
          <TextField
            style={{ marginTop: "40px" }}
            id="contact"
            label={this.state.contactType}
            placeholder={this.state.contactType}
            margin="normal"
            variant="filled"
            value={this.state.contact}
            onChange={this.handleContactChange("contact")}
          />
        </div>
        <Button
          style={{ marginTop: "60px" }}
          variant="contained"
          color="secondary"
          onClick={this.handleOrder}
        >
          Order
        </Button>
        <Button
          style={{ marginTop: "60px" }}
          variant="contained"
          color="primary"
          onClick={this.handleStatus}
        >
          Get Status
        </Button>
        <div>
          <h4>{this.state.message}</h4>
        </div>
        <div>
          <h4>{this.state.status}</h4>
        </div>
      </div>
    );
  }
}
