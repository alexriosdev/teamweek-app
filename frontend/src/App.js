import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard";
import Landing from "./components/pages/Landing";
import isLoggedIn from "./components/auth/isLoggedIn";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.userState.currentUser);
  const users = useSelector((state) => state.userState.users);

  return (
    <Router>
      {/* {console.log("Current User:", user)} */}
      {/* {console.log("Organization Members:", users)} */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route>
          {isLoggedIn() ? <Redirect to="/dashboard" /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
