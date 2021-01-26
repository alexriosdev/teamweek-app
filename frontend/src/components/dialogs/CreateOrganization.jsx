import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CreateOrganization = ({ close, organizations, setOrganizations }) => {
  const user = useSelector((state) => state.userState.currentUser);
  const initialState = {
    name: "",
    location: "",
    user_id: user.id,
  };

  const [organization, setOrganization] = useState(initialState);

  const handleChange = (event) => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const options = {
      method: "POST",
      body: JSON.stringify(organization),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(`http://localhost:3000/organizations`, options)
      .then((res) => res.json())
      .then((data) => setOrganizations([...organizations, data]));
    close();
  };

  return (
    <div>
      <Dialog open={true} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Organization</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Please Enter Name and Location of your New Organization
          </DialogContentText> */}
          <TextField
            autoFocus
            // required
            margin="dense"
            id="name"
            label="Organization Name"
            type="email"
            name="name"
            value={organization.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            // required
            margin="dense"
            id="name"
            label="Location"
            type="email"
            name="location"
            value={organization.location}
            onChange={handleChange}
          />
        </DialogContent>
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
export default CreateOrganization;
