import CfApi from '../services/cfApi';

let localStorage = window.localStorage;

let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  async login(username, password, cfUrl) {
    let token = await CfApi.login(username, password, cfUrl);

    // Save token to local storage
    localStorage.token = token;
    localStorage.cfUrl = cfUrl;
    localStorage.username = username;
    localStorage.password = password;

    return { token };
  },
  /**
  * Logs the current user out
  */

  logout() {
    console.log('Logging out');
    delete localStorage.token;
    /*return request.post('/logout')*/
  },
  /**
  * Checks if a user is logged in
  */
  isAuthenticated() {
    return !!localStorage.token;
  },

  getSavedUsername() {
    return localStorage.username;
  },
  getSavedPassword() {
    return localStorage.password;
  },
  getSavedCfUrl() {
    return localStorage.cfUrl;
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register(username, password) {
    // Post a fake request
    /* return request.post('/register', {username, password})
       // Log user in after registering
       .then(() => auth.login(username, password))*/
  },
  onChange() {},
};

export default auth;
