import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getRequest } from "../../utils/http-utils";

class PublicationsList extends Component {
  state = {
    publicationList: [],
  };

  componentDidMount() {
    getRequest(
      (users) => {
        this.setState({
          publicationList: [...users],
        });
      },
      { url: "/publishers" }
    );
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            window.location.assign("http://localhost:3001/publisher");
          }}
        >
          Add new publisher
        </button>
        <ul>
          {this.state.publicationList.map((publicationItem) => {
            return (
              <li key={publicationItem.id}>
                {publicationItem.pubName}
                <br />
                {publicationItem.publisherDate}
                <br />
                <button
                  onClick={() => {
                    window.location.assign(
                      "/publication/" + publicationItem.id
                    );
                  }}
                >
                  Details
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(PublicationsList);
