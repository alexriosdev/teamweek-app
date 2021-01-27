import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";
import OrganizationCard from "./OrganizationCard";
import CreateOrganization from "../dialogs/CreateOrganization";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "xl",
    position: "relative",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const OrganizationContainer = ({ setActive }) => {
  const classes = useStyles();
  const orgs = useSelector((state) => state.organizationState.organizations);
  const [organizations, setOrganizations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOrganizations(orgs);
  }, [orgs]);

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const handleSelect = (data) => {
    dispatch({ type: "SET_ORGANIZATION", organization: data });
    setActive("displaySchedule");
  };

  return (
    <div className={classes.content}>
      <Container className={classes.container}>
        <Typography variant="h4">Your Organizations</Typography>
        <br />
        {organizations.map((organization, idx) => (
          <OrganizationCard
            key={idx}
            organization={organization}
            handleSelect={handleSelect}
          />
        ))}
        <Button onClick={openDialog} variant="contained" color="primary">
          Create Organization
        </Button>
      </Container>
      {open ? (
        <CreateOrganization
          close={closeDialog}
          organizations={organizations}
          setOrganizations={setOrganizations}
        />
      ) : null}
    </div>
  );
};

export default OrganizationContainer;
