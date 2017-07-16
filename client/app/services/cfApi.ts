import 'isomorphic-fetch';

import Frisbee from 'frisbee';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

export default class CfApi {
  api;
  static menubar;

  constructor() {
    this.api = new Frisbee({
      baseURI: 'https://api.run.pivotal.io',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
  async login(username: string, password: string): Promise<string> {
    console.log("login")

    //"authorization_endpoint": "https://login.run.pivotal.io",
    //const requestURL = 'https://api.run.pivotal.io/v2/info';
    const uuaEndpoint = 'https://login.run.pivotal.io';
    let loginApi = new Frisbee({
      baseURI: uuaEndpoint,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });


    let data = {
      'grant_type': 'password',
      'username': username,
      'password': password,
      'scope': ''
    }
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Y2Y6',
      'X-UAA-Endpoint': uuaEndpoint
    }
    console.log("loginApu:", data)
    try {
      let res = await loginApi.post('/', data);
      console.log("res:", res);
      this.api.auth(res.body.api_token);
      return res.body.api_token
    } catch (err) {
      console.log(err);
      throw err;
    }


  }

  logout() {
    // unset auth now since we logged out
    this.api.auth();
  }

  checkStatus(response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw new ResponseError(response);
  }
}

export const cfApi = new CfApi();

