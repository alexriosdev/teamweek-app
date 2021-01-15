import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/navbar/Nav";
import NavDrawer from "./components/navbar/NavDrawer";
import WeekSchedule from "./components/schedule/WeekSchedule";
import ScheduleContainer from "./components/schedule/ScheduleContainer";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.userState.currentUser);
  const users = useSelector((state) => state.userState.users);

  return (
    <Router>
      {console.log("Current User:", user)}
      {console.log("Organization Members:", users)}
      <Nav />
      {/* <NavDrawer /> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/">
          <ScheduleContainer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
