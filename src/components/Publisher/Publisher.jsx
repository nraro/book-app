import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import { postRequest, getRequest, putRequest } from "../../utils/http-utils";

class Publisher extends Component {
  state = {
    pubName: "",
    pubDescription: "",
    pubCeo: "",
    pubLogo: "",
    pubCeoImg: "",
    publisherDate: "",
    publisherChk: false,
    publication: {},
  };

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";

    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let pubNameError = "";
    let pubDescriptionError = "";
    let pubLogoError = "";
    let pubCeoError = "";
    let pubCeoImgError = "";

    if (!this.state.pubName) {
      pubNameError = "Publisher's name cannot be blank!";
    } else if (this.state.pubName.length < 3) {
      pubNameError = "Publisher's name must contain at least 3 characters";
    }

    if (!this.state.pubDescription) {
      pubDescriptionError = "Publisher description cannot be blank!";
    }

    if (!this.state.pubLogo) {
      pubLogoError = "Please select publisher's logo!";
    }

    if (!this.state.pubCeo) {
      pubCeoError = "Please select the CEO's name!";
    }

    if (!this.state.pubCeoImg) {
      pubCeoImgError = "Please select CEO's image!";
    }

    if (
      pubNameError ||
      pubDescriptionError ||
      pubLogoError ||
      pubCeoError ||
      pubCeoImgError
    ) {
      this.setState({
        pubNameError,
        pubDescriptionError,
        pubLogoError,
        pubCeoError,
        pubCeoImgError,
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
    const publication = {
      id: this.state.id,
      pubName: this.state.pubName,
      pubDescription: this.state.pubDescription,
      pubCeo: this.state.pubCeo,
      pubLogo: this.state.pubLogo,
      pubCeoImg: this.state.pubCeoImg,
      publisherDate: this.state.publisherDate,
      publisherChk: this.state.publisherChk,
    };
    // to clear form on valid submit
    console.log(publication);
    if (isValid) {
      if (this.props.match.params.id) {
        putRequest(
          () => {
            window.location.assign(
              "http://localhost:3001/publication/" + this.props.match.params.id
            );
          },
          {
            body: publication,
            url: "/publishers/" + this.props.match.params.id,
          }
        );
      } else {
        postRequest(
          (publication) => {
            console.log(publication);
            window.location.assign("http://localhost:3001/publications-list");
          },
          { body: publication, url: "/publishers" }
        );
      }
    }
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      getRequest(
        (editPublication) => {
          console.log(editPublication);
          this.setState(
            {
              publication: editPublication,
              ...editPublication,
            },
            () => {
              console.log(this.state);
            }
          );
        },
        { url: "/publishers/" + this.props.match.params.id }
      );
    }
  }

  render() {
    return (
      <div>
        <form
          className="form"
          id={this.props.match.params.id}
          onSubmit={this.handleSubmit}
        >
          <h2>Add Publisher</h2>
          <input
            name="pubName"
            onChange={this.handleChange}
            value={this.state.pubName}
            type="text"
            placeholder="Name"
          />
          {this.state.pubNameError && (
            <div className="error">{this.state.pubNameError}</div>
          )}
          <input
            name="pubDescription"
            onChange={this.handleChange}
            value={this.state.pubDescription}
            type="text"
            placeholder="Description"
          />
          {this.state.pubDescriptionError && (
            <div className="error">{this.state.pubDescriptionError}</div>
          )}
          <input
            type="text"
            name="pubLogo"
            placeholder="Logo image"
            onChange={this.handleChange}
            value={this.state.pubLogo}
          />
          {this.state.pubLogoError && (
            <div className="error">{this.state.pubLogoError}</div>
          )}
          <input
            name="pubCeo"
            onChange={this.handleChange}
            value={this.state.pubCeo}
            type="text"
            placeholder="Name of CEO"
          />
          {this.state.pubCeoError && (
            <div className="error">{this.state.pubCeoError}</div>
          )}
          <input
            type="text"
            name="pubCeoImg"
            placeholder="CEO avatar"
            onChange={this.handleChange}
            value={this.state.pubCeoImg}
          />
          <input
            type="date"
            name="publisherDate"
            onChange={this.handleChange}
            value={this.state.publisherDate}
          />
          {this.state.pubCeoImgError && (
            <div className="error">{this.state.pubCeoImgError}</div>
          )}
          <label htmlFor="publisherChk">Allow reviews?</label>
          <input
            type="checkbox"
            name="publisherChk"
            onChange={this.handleChange}
            checked={this.state.publisherChk}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Publisher);
