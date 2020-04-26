import React, { Component } from "react";
import "./Signup.css";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import { postRequest } from "../../utils/http-utils.js";

// Added initialState for form reset
const initialState = {
  id: 0,
  userFullName: "",
  userEmailAddress: "",
  userPassword: "",
  userConfirmPassword: "",
  userCheckbox: false,
  userOtherCheckbox: false,
  nameError: "",
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
  userCheckboxError: "",
  userOtherCheckboxError: "",
};

class Singup extends Component {
  state = { ...initialState };

  // Check if field is checkbox, if yes return 'checked' else return the actual value
  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";

    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let passwordConfirmError = "";
    let userCheckboxError = "";
    let userOtherCheckboxError = "";

    if (!this.state.userFullName) {
      nameError = "Name cannot be blank!";
    } else if (this.state.userFullName.length < 6) {
      nameError = "Full name must contain at least 6 characters";
    }

    if (!this.state.userEmailAddress.includes("@")) {
      emailError = "Invalid email address";
    }

    if (!this.state.userPassword) {
      passwordError = "Password cannot be blank!";
    } else if (
      this.state.userPassword.length < 6 ||
      this.state.userPassword.length > 10
    ) {
      passwordError =
        "Password must contain a value between 6 and 10 characters";
    }

    if (this.state.userPassword !== this.state.userConfirmPassword) {
      passwordConfirmError = "Passwords must match!";
    }

    if (this.state.userCheckbox !== true) {
      userCheckboxError = "You must agree in order to proceed!";
    }

    if (this.state.userOtherCheckbox !== true) {
      userOtherCheckboxError = "You must agree in order to proceed!";
    }

    if (
      nameError ||
      emailError ||
      passwordError ||
      passwordConfirmError ||
      userCheckboxError ||
      userOtherCheckboxError
    ) {
      this.setState({
        nameError,
        emailError,
        passwordError,
        passwordConfirmError,
        userCheckboxError,
        userOtherCheckboxError,
      });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    const randomNumber = uuidv4();
    this.state.id = randomNumber;
    const user = {
      id: this.state.id,
      userName: this.state.userFullName,
      userPassword: this.state.userPassword,
      userEmail: this.state.userEmailAddress,
    };
    // to clear form on valid submit

    if (isValid) {
      this.setState(initialState);
      postRequest(
        (user) => {
          console.log(user);
          window.location.assign("http://localhost:3001/login");
        },
        { url: "/users", body: user }
      );
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <h3>sal</h3>
          <input
            name="userFullName"
            onChange={this.handleChange}
            value={this.state.userFullName}
            type="text"
            placeholder="Full name"
          />
          <div className="error">{this.state.nameError}</div>
          <input
            name="userEmailAddress"
            onChange={this.handleChange}
            value={this.state.userEmailAddress}
            type="text"
            placeholder="Email address"
          />
          <div className="error">{this.state.emailError}</div>
          <input
            name="userPassword"
            onChange={this.handleChange}
            value={this.state.userPassword}
            type="text"
            placeholder="Password"
          />
          <div className="error">{this.state.passwordError}</div>
          <input
            name="userConfirmPassword"
            onChange={this.handleChange}
            value={this.state.userConfirmPassword}
            type="text"
            placeholder="Confirm Password"
          />
          <div className="error">{this.state.passwordConfirmError}</div>
          <div>
            <input
              name="userCheckbox"
              checked={this.state.userCheckbox}
              onChange={this.handleChange}
              type="checkbox"
            />
            <label>Agree with terms</label>
          </div>
          <div className="error">{this.state.userCheckboxError}</div>
          <div>
            <input
              name="userOtherCheckbox"
              checked={this.state.userOtherCheckbox}
              onChange={this.handleChange}
              type="checkbox"
            />
            <label>Agree with some other terms</label>
          </div>
          <div className="error">{this.state.userOtherCheckboxError}</div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Singup);
