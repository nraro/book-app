import React, { Component } from "react";

export default class Publication extends Component {
  state = {
    publication: {},
  };

  componentDidMount() {
    this.getData((desiredPublication) => {
      this.setState(
        {
          publication: desiredPublication,
        },
        () => {
          console.log(this.state.publication);
        }
      );
    });
  }

  getData(cb) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);
    });
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        const specifiedPublication = JSON.parse(xhr.responseText);
        cb(specifiedPublication);
      }
    };
    // open the request with the verb and the url
    xhr.open(
      "GET",
      "http://localhost:3000/publishers/" + this.props.match.params.id
    );
    // send the request
    xhr.send();
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <h1>{this.state.publication.pubName}</h1>
        <p>
          Short description of publication:{" "}
          {this.state.publication.pubDescription}
        </p>
        <p>Year of publication: {this.state.publication.pubYear}</p>
        <p>CEO: {this.state.publication.pubCeo}</p>
        <img src={this.state.publication.pubCeoImg} />
        <p>Publication logo: </p>
        <img src={this.state.publication.pubLogo} />
        <br />
        <button
          onClick={() => {
            window.location.assign(
              "/publisher-edit/" + this.props.match.params.id
            );
          }}
        >
          Edit publication
        </button>
        <hr></hr>
        {this.state.publication.publisherChk === true && (
          <div>
            <textarea
              value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
          facere quos odio. Provident, eius rerum, nemo accusamus fugit
          laboriosam dolor officia ipsum nulla nesciunt, neque fugiat natus
          voluptatum odit aspernatur."
            ></textarea>
            <ul>
              <li>Georgel</li>
              <li>Ninel</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
