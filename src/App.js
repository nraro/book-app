import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signup from "./components/Singup/Singup";
import Login from "./components/Login/Login";
import Publisher from "./components/Publisher/Publisher";
import PublicationsList from "./components/PublicationsList/PublicationsList";
import Publication from "./components/Publication/Publication";
import Text from "./components/Test/Text";

export default class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <Router>
          {/* <Signup /> */}
          <Switch>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/publisher">
              <Publisher />
            </Route>
            <Route path="/publisher-edit/:id">
              <Publisher />
            </Route>
            <Route exact path="/publications-list">
              <PublicationsList />
            </Route>
            <Route exact path="/test-route">
              <Text />
            </Route>
            <Route path="/publication/:id" component={Publication} />
          </Switch>
        </Router>
      </div>
    );
  }
}
