import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PersonIcon from "@material-ui/icons/Person";
import { format } from "date-fns";
import ChangeSchedule from "../dialogs/ChangeSchedule";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  wrapper: {
    overflowX: "scroll",
  },
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    minWidth: 100,
  },
  body: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  icon: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  userCell: {
    padding: theme.spacing(1),
  },
  timeCell: {
    color: theme.palette.primary.dark,
    fontSize: "0.6rem",
    fontWeight: 700,
  },
  offCell: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.contrastText,
    fontSize: "0.6rem",
    fontWeight: 700,
  },
}));

const WeekSchedule = ({ days, schedules }) => {
  const classes = useStyles();

  const [scheduleData, setScheduleData] = useState(schedules);

  useEffect(() => {
    setScheduleData(schedules);
  }, [schedules]);

  const [active, setActive] = useState(false);
  const [shift, setShift] = useState({});
  const [position, setPosition] = useState({});

  const closeDialog = () => {
    setActive(false);
  };

  const handleEmployee = (user) => {
    alert("CLICKED ON EMPLOYEE:", user.first_name);
  };

  const handleClick = (value, i, j) => {
    setShift(value);
    setPosition({ i: i, j: j });
    setActive(true);
    // return ChangeSchedule;
    // DETERMINES IF DATE MATCHES
    // const result = schedules.find((schedule) => schedule.format_date === date);

    // createSchedule(result, value);
    // updateSchedule(value);

    // If date corresponds to the stored dates, then:
    // if value is empty, make a post (create schedule)
    // if value exists, make a patch (update schedule)

    // If date doesn't exist:
    // Create Date and Create Schedule
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EmployeeCell = ({ user }) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return (
      <Chip
        onClick={() => handleEmployee(user)}
        className={classes.userCell}
        label={fullName}
        avatar={
          user.avatar ? (
            <Avatar src={user.avatar} />
          ) : (
            <Avatar>
              <PersonIcon className={classes.icon} />
            </Avatar>
          )
        }
      />
    );
  };

  const TimeCell = ({ shift, i, j }) => {
    if (shift.is_available) {
      return (
        <TableCell
          onClick={() => handleClick(shift, i, j)}
          className={classes.timeCell}
        >
          {shift.start_time ? `${shift.start_time} — ${shift.end_time}` : ""}
        </TableCell>
      );
    } else {
      return (
        <TableCell
          onClick={() => handleClick(shift, i, j)}
          align="center"
          className={classes.timeCell}
        >
          {""}
        </TableCell>
      );
    }
  };

  const HeaderRow = () => {
    const columns = days.map((day) => format(day, "dd EEE"));
    columns.unshift("Name");
    return columns.map((column, idx) => (
      <TableCell key={idx} className={classes.head}>
        {column}
      </TableCell>
    ));
  };

  const BodyRow = () => {
    // return schedules
    return scheduleData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((e, i) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={i}
            className={classes.body}
          >
            <TableCell>
              <EmployeeCell user={e.user} />
            </TableCell>
            {e.schedules.map((shift, j) => (
              <TimeCell key={j} shift={shift} i={i} j={j} />
            ))}
          </TableRow>
        );
      });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <HeaderRow />
            </TableRow>
          </TableHead>
          <TableBody>
            <BodyRow />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        // count={schedules.length}
        count={scheduleData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {active ? (
        <ChangeSchedule
          close={closeDialog}
          shift={shift}
          // setShift={setShift}
          position={position}
          scheduleData={scheduleData}
          setScheduleData={setScheduleData}
        />
      ) : null}
    </Paper>
  );
};

export default WeekSchedule;
