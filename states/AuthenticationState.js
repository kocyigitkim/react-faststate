import FastState from "..";

export default class AuthenticationState extends FastState {
  constructor() {
    super();
    this.user = null;
    this.isLoggedIn = false;
  }
  login(user) {
    this.user = user;
    this.isLoggedIn = true;
  }
  logout() {
    this.isLoggedIn = false;
    this.user = null;
  }
}
