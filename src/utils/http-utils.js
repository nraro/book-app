const baseURL = "http://localhost:3000";

export function httpRequest(cb, url, method, debug = false) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    if (debug) {
      console.log(xhr.responseText);
    }
  });

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const responseBody = JSON.parse(xhr.responseText);
      if (debug) {
        console.log(responseBody);
      }
      cb(responseBody);
    }
  };

  xhr.open(method, baseURL + url);

  xhr.send();
}

export function getRequest(cb, url, debug = false) {
  httpRequest(cb, url, "GET", debug);
}

export function postRequest(cb, url, debug = false) {
  httpRequest(cb, url, "POST", debug);
}

export function putRequest(cb, url, debug = false) {
  httpRequest(cb, url, "PUT", debug);
}

export function deleteRequest(cb, url, debug = false) {
  httpRequest(cb, url, "DELETE", debug);
}
