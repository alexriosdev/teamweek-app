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
import { Button, Container, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { format } from "date-fns";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thrusday", label: "Thrusday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const createData = (
  name,
  monday,
  tuesday,
  wednesday,
  thrusday,
  friday,
  saturday,
  sunday
) => {
  return {
    name,
    monday,
    tuesday,
    wednesday,
    thrusday,
    friday,
    saturday,
    sunday,
  };
};

const users = [
  createData("Zeus", "9-5PM", "", "8-6PM"),
  createData("Hades", "9-5PM"),
  createData("Poseidon", "9-5PM"),
  createData("Aries", "9-5PM"),
  createData("Apollo", "9-5PM"),
];

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
}));

const handleClick = (value) => {
  console.log("user", value);
};

const WeekSchedule = ({ days }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const UserCell = ({ value }) => {
    return (
      <Chip
        onClick={() => handleClick(value)}
        label={value}
        avatar={
          <Avatar>
            <PersonIcon className={classes.icon} />
          </Avatar>
        }
      />
    );
  };

  const HeaderRow = ({ days }) => {
    const columns = days.map((day) => format(day, "dd EEE"));
    columns.unshift("Name");
    return columns.map((column, idx) => (
      <TableCell key={idx} className={classes.head}>
        {column}
      </TableCell>
    ));
  };

  const BodyRow = ({ users, days }) => {
    const columns = days.map((day) => format(day, "EEEE").toLowerCase());
    columns.unshift("name");
    return users
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((user, idx) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={idx}
            className={classes.body}
          >
            {columns.map((column, idx) => {
              const cellValue = user[column];
              return (
                <TableCell
                  key={idx}
                  // BUGGY LISTENER NEEDS FIX
                  onClick={() => console.log("clicked on", cellValue)}
                >
                  {column === "name" ? (
                    <UserCell value={cellValue} />
                  ) : (
                    cellValue
                  )}
                </TableCell>
              );
            })}
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
              <HeaderRow days={days} />
            </TableRow>
          </TableHead>
          <TableBody>
            <BodyRow users={users} days={days} />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default WeekSchedule;
