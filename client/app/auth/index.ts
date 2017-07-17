import  CfApi  from '../services/cfApi';

let localStorage = window.localStorage


let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login(username, password) {

   /* if (auth.loggedIn()) {
      console.log("loggedIn?")
      return Promise.resolve(true)
    }*/

    return CfApi.login(username, password)
      .then(token => {
        // Save token to local storage
        localStorage.token = token;
        return Promise.resolve(true)
      })
  },
  /**
  * Logs the current user out
  */
  logout() {
    /*return request.post('/logout')*/
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn() {
    return !!localStorage.token
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
  onChange() { }
}

export default auth
