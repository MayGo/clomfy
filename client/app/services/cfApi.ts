import { getBuildpacks } from '../containers/BuildpacksPage/sagas';
import 'whatwg-fetch';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
export class AuthError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthError.prototype);
    this.response = response;
  }
}

export default class CfApi {
  static apiUrl = 'https://api.run.pivotal.io/v2/';
  static api;

  constructor() {

    /* Cf.api = restful('https://api.run.pivotal.io/v2', fetchBackend(fetch));
     if (window.localStorage.token) {
       console.log("Token found in local storage");
       CfApi.setToken(window.localStorage.token);
     }*/
  }

  static request(url: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: CfApi.getToken(),
      },
    };
    return fetch(CfApi.apiUrl + url, options)
      .then(CfApi.checkStatus)
      .then(CfApi.parseJSON)
  }
  static setToken(token: string) {
    //this.api.header('Authorization', 'Bearer ' + token);
  }

  static getToken() {
    return 'Bearer ' + window.localStorage.token;
  }

  static async login(username: string, password: string): Promise<string> {
    console.log("login")

    //"authorization_endpoint": "https://login.run.pivotal.io",
    //const requestURL = 'https://api.run.pivotal.io/v2/info';
    const uuaEndpoint = 'https://login.run.pivotal.io';

    var data = new URLSearchParams()
    data.append('grant_type', 'password')
    data.append('username', username)
    data.append('password', password)
    data.append('response_type', 'token')

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic Y2Y6',
        'X-UAA-Endpoint': uuaEndpoint
      },
      body: data
    };
    let response = await fetch(uuaEndpoint + "/oauth/token", options)
    let jsonData = await response.json();

    console.log("Response json:", jsonData);

    let token = jsonData.access_token;
    if (token) {
   
      // save access token and username in session storage
      /* localStorage.setItem('accessToken', response.access_token);
       localStorage.setItem('refreshToken', response.refresh_token);
       localStorage.setItem('expiresIn', response.expires_in);
       localStorage.setItem('userName', logInData.userName);
       localStorage.setItem('lastTime', Date.now());*/
      //this.api.auth(token);
      this.setToken(token);
      return token;
    } else {
      // log in failed
      console.error("Token not found");
      throw new ResponseError(response);
    }

  }

  static getBuildpacks() {
    console.log("getBuildpacks")
    const buildpacksCollection = this.api.all('buildpacks');
    console.log(buildpacksCollection)
    const repos = buildpacksCollection.getAll().then((repos2) => {
      console.log(repos2)
    })
    console.log("Buildpacks:", repos);
    return repos
  }


  static checkStatus(response): Response {

    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    if (response.status == 401) {
      throw new AuthError(response);
    }
    throw new ResponseError(response);
  }
  static parseJSON(response) {
    return response.json();
  }
}


