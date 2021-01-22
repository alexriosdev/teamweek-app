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
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const user = useSelector((state) => state.userState.currentUser);

  return (
    <Router>
      {/* {console.log("Current User:", user)} */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
