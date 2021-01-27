import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import BusinessIcon from "@material-ui/icons/Business";
import Typography from "@material-ui/core/Typography";
import EditOrganization from "../dialogs/EditOrganization";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: "25vw",
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
}));

const OrganizationCard = ({ organization, handleSelect }) => {
  const classes = useStyles();
  const org = useSelector((state) => state.organizationState.organization);
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <BusinessIcon />
          <Typography variant="h5" component="h2">
            {organization.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {organization.location}
          </Typography>
        </CardContent>
        <CardActions>
          {org ? (
            <Button
              onClick={() => handleEdit(organization)}
              size="small"
              className={classes.button}
            >
              Edit
            </Button>
          ) : null}
          <Button
            onClick={() => handleSelect(organization)}
            size="small"
            color="primary"
          >
            Select
          </Button>
        </CardActions>
      </Card>
      {open ? (
        <EditOrganization close={handleClose} org={organization} />
      ) : null}
      <br />
    </>
  );
};

export default OrganizationCard;
