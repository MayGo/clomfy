import { AuthError } from './auth-error';
import { ResponseError } from './response-error';
import 'whatwg-fetch';
import * as queryString from 'query-string';

export default class CfApi {
  static apiUrl: any = 'https://api.run.pivotal.io/v2/';

  static request(url: string, query: any = {}) {
    const stringified = queryString.stringify(query);

    console.log('Requesting ' + url + ' with query ' + stringified);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: CfApi.getToken(),
      },
    };

    return fetch(CfApi.apiUrl + url, options)
      .then(CfApi.checkStatus)
      .then(CfApi.parseJSON);
  }

  static setToken(token: string) {
    //this.api.header('Authorization', 'Bearer ' + token);
  }

  static getToken() {
    return 'Bearer ' + window.localStorage.token;
  }

  static async login(username: string, password: string): Promise<string> {
    console.log('login');

    //"authorization_endpoint": "https://login.run.pivotal.io",
    //const requestURL = 'https://api.run.pivotal.io/v2/info';
    const uuaEndpoint = 'https://login.run.pivotal.io';

    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);
    data.append('response_type', 'token');

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic Y2Y6',
        'X-UAA-Endpoint': uuaEndpoint,
      },
      body: data,
    };
    let response = await fetch(uuaEndpoint + '/oauth/token', options);
    let jsonData = await response.json();

    console.log('Response json:', jsonData);

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
      console.error('Token not found');
      throw new ResponseError(response);
    }
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
