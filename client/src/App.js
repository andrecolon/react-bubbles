import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import BubblesPage from "./components/BubblePage";

import PrivateRoute from "./util/PrivateRoute";
import "./styles.scss";


function App() {

  return (
    <Router>
      <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/Bubbles">Bubbles Page</Link>
              </li>
            </ul>
        </nav>
        <Switch>
          <PrivateRoute exact path="/Bubbles" component={BubblesPage} />
          <Route path="/login" component={Login}/>
          <Route component={Login} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;