import React from "react";
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
}));

const WeekSchedule = ({ days, schedules }) => {
  const classes = useStyles();

  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState("");

  const closeDialog = () => {
    setActive(false);
  };

  const handleEmployee = (user) => {
    alert("CLICKED ON EMPLOYEE:", user);
  };

  const handleClick = (value) => {
    setValue(value);
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EmployeeCell = ({ user }) => {
    console.log(user);
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

  const TimeCell = ({ day }) => {
    if (day) {
      return (
        <TableCell
          onClick={() => handleClick(day)}
          className={classes.timeCell}
        >
          {day == undefined ? "" : `${day.start_hour} — ${day.end_hour}`}
        </TableCell>
      );
    } else {
      return (
        <TableCell align="center" style={{ background: "gray" }}>
          OFF
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
    return schedules
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((e, r_idx) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={r_idx}
            className={classes.body}
          >
            <TableCell>
              <EmployeeCell user={e.user} />
            </TableCell>
            {e.schedules.map((day, c_idx) => (
              <TimeCell day={day} key={c_idx} />
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
        count={schedules.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {active ? <ChangeSchedule close={closeDialog} data={value} /> : null}
    </Paper>
  );
};

export default WeekSchedule;
