import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createEmployee } from "../../actions/apiActions";

const CreateEmployee = ({ close, organization, employees, setEmployees }) => {
  const ww_id = useSelector((state) => state.scheduleState.work_week_id);
  console.log(ww_id);
  const initialState = {
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
    phone_number: "",
  };

  const [user, setUser] = useState(initialState);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const dispatch = useDispatch();
  const handleSave = () => {
    const data = {
      user: user,
      org_id: organization.id,
      ww_id: ww_id,
    };
    createEmployee(dispatch, data);
    const newEmployee = {
      profile: user.avatar,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      phone_number: user.phone_number,
    };
    setEmployees([...employees, newEmployee]);
    close();
  };

  return (
    <div>
      <Dialog open={true} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                value={user.first_name}
                variant="outlined"
                required
                fullWidth
                id="first_name"
                name="first_name"
                label="First Name"
                autoComplete="fname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                value={user.last_name}
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                // autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={user.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={user.phone_number}
                variant="outlined"
                required
                fullWidth
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                type="phone_number"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreateEmployee;
