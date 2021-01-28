import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessIcon from "@material-ui/icons/Business";

const PrimaryDrawer = ({ handleActive }) => {
  return (
    <div>
      <ListItem button onClick={() => handleActive("displaySchedule")}>
        <ListItemIcon>
          <DateRange />
          {/* <DashboardIcon /> */}
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>
      <ListItem button onClick={() => handleActive("displayEmployees")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItem>
      <ListItem button onClick={() => handleActive("displayOrganizations")}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Organizations" />
      </ListItem>
    </div>
  );
};

const SecondaryDrawer = () => {
  return (
    <div>
      <ListSubheader inset>Saved Schedules</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current week" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last week" />
      </ListItem>
    </div>
  );
};

export { PrimaryDrawer, SecondaryDrawer };
