import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Billing from "./pages/Billing";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/signin" component={Dashboard} />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables}></Route>
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/sign-up" exact component={SignUp} />
          <Redirect from="*" to="/signin" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
