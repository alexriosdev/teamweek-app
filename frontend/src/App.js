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

const App = () => {
  return (
    <Router>
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
