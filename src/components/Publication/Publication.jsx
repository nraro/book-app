import React, { Component } from "react";
import { getRequest } from "../../utils/http-utils";

export default class Publication extends Component {
  state = {
    publication: {},
  };

  componentDidMount() {
    getRequest(
      (desiredPublication) => {
        this.setState({
          publication: desiredPublication,
        });
      },
      {
        url: "/publishers/" + this.props.match.params.id,
      }
    );
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
