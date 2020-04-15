import React, { Component } from "react";
import { withRouter } from "react-router-dom";

function getPublications(cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const userPublications = JSON.parse(xhr.responseText);
      cb(userPublications);
    }
  };
  xhr.open("GET", "http://localhost:3000/publishers", true);
  xhr.send(null);
}

class PublicationsList extends Component {
  state = {
    publicationList: [],
  };

  componentDidMount() {
    getPublications((users) => {
      this.setState(
        {
          publicationList: [...users],
        },
        () => {
          //   console.log(this.state.publicationsList[1]);
        }
      );
    });
  }

  render() {
    return (
      <div>
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
