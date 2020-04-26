const baseURL = "http://localhost:3000";

export function httpRequest(cb, options) {
  const { url, method, body, debug } = options;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    if (debug) {
      console.log(xhr.responseText);
    }
  });

  xhr.open(method, baseURL + url, true);

  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const responseBody = JSON.parse(xhr.responseText);
      if (debug) {
        console.log(responseBody);
      }
      cb(responseBody);
    }
  };

  xhr.send(JSON.stringify(body));
}

export function getRequest(cb, options) {
  httpRequest(cb, { ...options, method: "GET" });
}

export function postRequest(cb, options) {
  httpRequest(cb, { ...options, method: "POST" });
}

export function putRequest(cb, options) {
  httpRequest(cb, { ...options, method: "PUT" });
}

export function deleteRequest(cb, options) {
  httpRequest(cb, { ...options, method: "DELETE" });
}
