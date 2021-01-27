import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
}));

const EditOrganization = ({ close, org }) => {
  const classes = useStyles();
  const [organization, setOrganization] = useState(org);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const org_id = organization.id;
    const options = {
      method: "PATCH",
      body: JSON.stringify(organization),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(`http://localhost:3000/organizations/${org_id}`, options)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "UPDATE_ORGANIZATIONS", organization: data })
      );
    close();
  };

  const handleDelete = () => {
    console.log(organization.id);
    const org_id = organization.id;
    const options = { method: "DELETE" };
    fetch(`http://localhost:3000/organizations/${org_id}`, options);
    dispatch({ type: "DELETE_ORGANIZATION", organization: organization });
    close();
  };

  return (
    <div>
      <Dialog open={true} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Organization</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
          <Button
            onClick={handleDelete}
            size="small"
            className={classes.button}
          >
            Delete
          </Button>
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
export default EditOrganization;
