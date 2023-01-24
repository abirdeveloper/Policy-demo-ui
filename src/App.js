import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import AppNavbar from "../src/Components/AppNavbar";
import Home from "../src/Components/Home";
import RegisterForm from "./Components/Login/RegisterForm";
import PolicyDash from "./Components/PolicyDashboard/PolicyDash"
function App() {
  return (
    <div className="App">
       <Router>
          <AppNavbar />
          <Switch>
            <Route exact path="/" component={PolicyDash} />           
            {/* <Route exact path="/Register" component={RegisterForm} />
            <Route exact path="/Home" component={Home} /> */}
            <Route exact path="/Policies" component={PolicyDash} />           
            <Redirect to="/Policies" />
          </Switch>
         
        </Router>
     
    </div>
  );
}

export default App;
