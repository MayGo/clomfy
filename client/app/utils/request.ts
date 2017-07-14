import 'whatwg-fetch';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new ResponseError(response);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: string, options?: RequestInit): Promise<{ data: any } | { err: ResponseError }> {
  const f = window ? window.fetch : fetch;
  return f(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}


export function requestCf(url: string, options?: RequestInit) {
  const authHeader = "bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InNoYTItMjAxNy0wMS0yMC1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI1NDEyMDg0ZjE5ZDM0ZTUzYjJhNDM1Zjg3NWI2NTk2MCIsInN1YiI6ImI3YmFmOGU4LWEwZTEtNDE3Ni05ODk4LWM3ZWE3MGI4NzYwYSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsImFjdHVhdG9yLnJlYWQiLCJjbG91ZF9jb250cm9sbGVyLnVzZXIiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwib3BlbmlkIl0sImNsaWVudF9pZCI6ImFwcHNfbWFuYWdlcl9qcyIsImNpZCI6ImFwcHNfbWFuYWdlcl9qcyIsImF6cCI6ImFwcHNfbWFuYWdlcl9qcyIsInVzZXJfaWQiOiJiN2JhZjhlOC1hMGUxLTQxNzYtOTg5OC1jN2VhNzBiODc2MGEiLCJvcmlnaW4iOiJ1YWEiLCJ1c2VyX25hbWUiOiJtYWlnby5lcml0QGdtYWlsLmNvbSIsImVtYWlsIjoibWFpZ28uZXJpdEBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE1MDAwMzg3NTYsInJldl9zaWciOiJiNGMwZWMzZCIsImlhdCI6MTUwMDAzODgwNSwiZXhwIjoxNTAwMDY3NjA1LCJpc3MiOiJodHRwczovL3VhYS5ydW4ucGl2b3RhbC5pby9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJjbG91ZF9jb250cm9sbGVyIiwiYWN0dWF0b3IiLCJvcGVuaWQiLCJhcHBzX21hbmFnZXJfanMiXX0.No6iMoaFcptRu45C6vKFvSHMpUf5JvBco9-NK-p0I9jeIBOh1JRPmbzD2uoFMkbqc5BT8SLuQP3m-tT9uP-rinvxhOLwyCaIC_LBlbrjYmlHyaFB68-3DG8vUeG9fEqZf68mE-HFh9RfCpfpKbs-vEgbgz7ALX9YbQd1iDzV6aKirbhsR8gA6FfkeMxW6OJ-AZBSvzSAQ7caFiF2DcbZRDHc-r0ck8gB4uBRhQZI7BXC6ymJCsNQnk0e5LqMMUYn6Gj2On6h7fk3Xh5gKrqy_Pd5j_37KOYA0AVC5q5yhgeFWvYCNERAog6-DYHX0Kqub1M0jPhCCGGUC6R3hnjBvA"
  const options2 = {
    method: 'GET',
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'et-EE,et;q=0.8,en-US;q=0.6,en;q=0.4',
      accept: 'application/json',
      Host: 'console.run.pivotal.io',
      Authorization: authHeader,
    },
  };
  return fetch(url, options2)
    .then(checkStatus)
    .then(parseJSON);
}