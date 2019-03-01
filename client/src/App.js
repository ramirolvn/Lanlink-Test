import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import RegisterTransictions from "./components/transictions/regiterTransiction";
import RegisterSection from "./components/section/registerSection";
import ViewAllTransictions from "./components/transictions/viewAllTransictions";
import ViewTransictions from "./components/transictions/viewTransictions";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import "./App.css";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Landing} />
              <PrivateRoute exact path="/register" component={Register} />
              <PrivateRoute exact path="/registerTransictions" component={RegisterTransictions} />
              <PrivateRoute exact path="/registerSection" component={RegisterSection} />
              <PrivateRoute exact path="/viewAllTransictions" component={ViewAllTransictions} />
              <PrivateRoute exact path="/viewTransictions" component={ViewTransictions} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
