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
import { Container, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

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

const rows = [
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
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const handleClick = (value) => {
  console.log("user", value);
};

const WeekSchedule = () => {
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

  return (
    <Container maxWidth="xl" style={{ position: "relative" }}>
      <Typography variant="h4">Week Schedule</Typography>

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} className={classes.head}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      className={classes.body}
                    >
                      {columns.map((column) => {
                        const cellValue = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.id === "name" ? (
                              <Chip
                                onClick={() => handleClick(cellValue)}
                                label={cellValue}
                                avatar={
                                  <Avatar>
                                    <PersonIcon className={classes.icon} />
                                  </Avatar>
                                }
                              />
                            ) : (
                              cellValue
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default WeekSchedule;
