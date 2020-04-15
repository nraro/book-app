import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";

function postData(publication, navigator) {
  var http = new XMLHttpRequest();
  var url = "http://localhost:3000/publishers";
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function () {
    console.log(http.readyState);
    console.log(http.status);
    //Call a function when the state changes.
    if (http.readyState == 4 && (http.status == 200 || http.status == 201)) {
      navigator.push("/publications-list");
    }
  };
  http.send(JSON.stringify(publication));
}

function getPublicationToBeEdited(cb) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
  });

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const specifiedPublication = JSON.parse(xhr.responseText);
      console.log(specifiedPublication);
      cb(specifiedPublication);
    }
  };

  xhr.open("GET", "http://localhost:3000/publishers/", console.log(this));

  xhr.send();
}

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
      // this.setState(initialState);
      postData(publication, this.props.history);
    }
  };

  componentDidMount() {
    getPublicationToBeEdited((editPublication) => {
      this.setState(
        {
          publication: editPublication,
        },
        () => {
          console.log(this.props.match.params.id);
          console.log(this);

          // const exactID = this.props.match.params.id;
          // const arrayOfID = this.state.publication;

          // const desiredPublication = (exactID, arrayOfID) => {
          //   for (let i = 0; i < arrayOfID.length; i++) {
          //     if (arrayOfID[i].id === exactID) {
          //       console.log(arrayOfID[i]);
          //       return arrayOfID[i];
          //     }
          //   }
          // };

          // --------------------------------

          // if (this.props.match.params.id) {
          //   this.setState({
          //     pubName: this.state.publication.pubName,
          //     pubDescription: this.state.publication.pubDescription,
          //     pubCeo: this.state.publication.pubCeo,
          //     pubLogo: this.state.publication.pubLogo,
          //     pubCeoImg: this.state.publication.pubCeoImg,
          //     publisherDate: this.state.publication.publisherDate,
          //     publisherChk: this.state.publication.publisherChk,
          //   });
          // }
        }
        // Remake function with router
        // () => {
        //   const currUrl = window.location.pathname;
        //   const splitUrl = currUrl.split("/");
        //   const urlID = splitUrl[2];
        //   // console.log(urlID);
        //   const search = (urlID, publication) => {
        //     for (let i = 0; i < publication.length; i++) {
        //       if (publication[i].id === urlID) {
        //         return publication[i];
        //       }
        //     }
        //   };
        //   const resultID = search(urlID, this.state.publication);
        //   // console.log(resultID);
        //   this.setState(
        //     {
        //       publication: resultID,
        //     },
        //     () => {
        //       if (urlID === resultID.id) {
        //         console.log("egalite, fraternite");
        //         // console.log(this.state.publication);
        //         this.setState({
        //           pubName: this.state.publication.pubName,
        //           pubDescription: this.state.publication.pubDescription,
        //           pubCeo: this.state.publication.pubCeo,
        //           pubLogo: this.state.publication.pubLogo,
        //           pubCeoImg: this.state.publication.pubCeoImg,
        //           publisherDate: this.state.publication.publisherDate,
        //           publisherChk: this.state.publication.publisherChk,
        //         });
        //       }
        //     }
        //   );
        // }
      );
    });
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
