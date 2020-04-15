import React, { Component } from "react";

function getData(cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const userList = JSON.parse(xhr.responseText);
      cb(userList);
    }
  };
  xhr.open("GET", "http://localhost:3000/users", true);
  xhr.send(null);
}

export default class Login extends Component {
  state = {
    userName: "",
    userPassword: "",
    formError: false
  };

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";

    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    getData(userList => {
      const filteredUsers = userList.filter(userObject => {
        if (
          this.state.userName === userObject.userName &&
          this.state.userPassword === userObject.userPassword
        ) {
          console.log(userObject);
          return userObject;
        }
      });
      if (filteredUsers.length === 1) {
        console.log("user found");
      } else {
        console.log("user not found");
      }
      console.log(filteredUsers);
    });
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <h2>Please login</h2>
          <input
            name="userName"
            onChange={this.handleChange}
            value={this.state.userName}
            type="text"
            placeholder="Email address"
          />
          <input
            name="userPassword"
            onChange={this.handleChange}
            value={this.state.userPassword}
            type="text"
            placeholder="Password"
          />
          <button type="submit">Submit</button>
          {this.state.formError == true && (
            <div className="error">User name or Password are incorrect!</div>
          )}
        </form>
      </div>
    );
  }
}
