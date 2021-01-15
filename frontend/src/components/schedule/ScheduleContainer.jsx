import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, IconButton, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import {
  eachDayOfInterval,
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import WeekSchedule from "./WeekSchedule";

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
  const classes = useStyles();
  const currentWeek = WeekPrinter(new Date());
  const [days, setDays] = useState(currentWeek);

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

  const DateControll = ({ startDay, endDay }) => {
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
      <Container className={classes.container}>
        <Typography variant="h4">Week Schedule</Typography>
        <DateControll startDay={days[0]} endDay={days[days.length - 1]} />
        <WeekSchedule days={days} />
      </Container>
    </div>
  );
};

export default ScheduleContainer;
