import React, { Component } from "react";
import { getRequest, postRequest, deleteRequest } from "../../utils/http-utils";

export default class Text extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            getRequest(
              (x) => {
                console.log(x);
              },
              {
                debug: true,
                url: "/publishers",
              }
            );
          }}
        >
          Get
        </button>
        <button
          onClick={() => {
            postRequest(
              (x) => {
                console.log(x);
              },
              {
                url: "/test",
                body: {
                  id: "1",
                  nume: "cornel",
                },
              }
            );
          }}
        >
          Post
        </button>
        <button
          onClick={() => {
            deleteRequest(
              (x) => {
                console.log(x);
              },
              {
                url: "/test/1",
              }
            );
          }}
        >
          Delete
        </button>
        <button>Put</button>
      </div>
    );
  }
}
