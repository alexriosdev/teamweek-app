import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, IconButton, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  eachDayOfInterval,
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import WeekSchedule from "./WeekSchedule";
import ScheduleTable from "./ScheduleTable";
import { fetchWorkWeek } from "../../actions/apiActions";

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.primary.main,
    minWidth: 100,
  },
  icon: {
    fontSize: "small",
  },
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

const WeekPrinter = (date) => {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
};

const ScheduleContainer = () => {
  const organization = useSelector(
    (state) => state.organizationState.organization
  );
  const classes = useStyles();
  const currentWeek = WeekPrinter(new Date());

  const [days, setDays] = useState(currentWeek);
  const schedules = useSelector((state) => state.scheduleState.schedules);

  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      full_date: format(days[0], "P"),
      org_id: organization.id,
    };
    fetchWorkWeek(dispatch, data);
  }, []);

  const handleForward = () => {
    const nextDay = addDays(days[days.length - 1], 1);
    const nextWeek = WeekPrinter(nextDay);
    setDays(nextWeek);
  };

  const handleBackward = () => {
    const prevDay = subDays(days[0], 1);
    const prevWeek = WeekPrinter(prevDay);
    setDays(prevWeek);
  };

  const handleCurrent = () => {
    setDays(currentWeek);
  };

  const DateControl = ({ startDay, endDay }) => {
    return (
      <>
        <IconButton onClick={() => handleCurrent()}>
          <HomeIcon className={classes.icon} />
        </IconButton>
        <IconButton onClick={() => handleBackward()}>
          <ArrowBackIosIcon className={classes.icon} />
        </IconButton>
        <IconButton onClick={() => handleForward()}>
          <ArrowForwardIosIcon className={classes.icon} />
        </IconButton>
        <Typography
          variant="button"
          className={classes.head}
          onClick={() => handleCurrent()}
        >
          {format(startDay, "MMMM dd")} — {format(endDay, "dd, yyyy")}
        </Typography>
      </>
    );
  };

  return (
    <div className={classes.content}>
      {console.log(schedules.length)}
      <Container className={classes.container}>
        {schedules.length <= 0 ? (
          <>
            <Typography variant="h4">Create Employees to Continue</Typography>
            <br />
            <ArrowBackIcon />
          </>
        ) : (
          <>
            {/* <Typography variant="h4">Week Schedule</Typography> */}
            <Typography variant="h4">{organization.name} Schedule</Typography>
            <DateControl startDay={days[0]} endDay={days[days.length - 1]} />
            <WeekSchedule days={days} schedules={schedules} />
            {/* <ScheduleTable days={days} schedules={schedules} /> */}
          </>
        )}
      </Container>
    </div>
  );
};

export default ScheduleContainer;
