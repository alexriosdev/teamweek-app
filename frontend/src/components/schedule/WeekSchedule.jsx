import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchDateSchedule, fetchMembers } from "../../actions/apiActions";

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

const handleClick = (value) => {
  console.log("Value: ", value);
};

const WeekSchedule = ({ days }) => {
  const classes = useStyles();
  const users = useSelector((state) => state.userState.users);
  const schedules = useSelector((state) => state.scheduleState.schedules);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchMembers(dispatch);
    for (let i = 0; i < days.length; i++) {
      let date = format(days[i], "P");
      fetchDateSchedule(dispatch, { format_date: date });
    }
  }, [days]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = days.map((day) => format(day, "P"));

  // WORKING FUNCTION✅
  const scheduleSorter = () => {
    let sorterInner = [];
    let sorterOuter = [];
    for (let x = 0; x < users.length; x++) {
      if (!sorterInner.includes(users[x])) {
        sorterInner.push(users[x]); // First push the User, if it's not in the array
      }
      for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < schedules.length; j++) {
          if (columns[i] === schedules[j].format_date) {
            // If the Date exists, continue
            if (schedules[j].schedules) {
              for (let k = 0; k < schedules[j].schedules.length; k++) {
                if (schedules[j].schedules[k]) {
                  // If the schedule exists, continue
                  if (schedules[j].schedules[k].user_id === users[x].id) {
                    sorterInner.push(schedules[j].schedules[k]); // Then push the schedule value into array
                  }
                }
              }
            }
            // If the Date doesn't exist, place empty value in array
            if (sorterInner && schedules[j].schedules.length == 0) {
              sorterInner.push(undefined);
            }
          }
        }
      }
      sorterOuter.push(sorterInner);
      sorterInner = [];
    }
    return sorterOuter;
  };
  let scheduleData = scheduleSorter();

  const UserCell = ({ value }) => {
    const fullName = `${value.first_name} ${value.last_name}`;
    return (
      <Chip
        onClick={() => handleClick(value)}
        className={classes.userCell}
        label={fullName}
        avatar={
          value.avatar ? (
            <Avatar src={value.avatar} />
          ) : (
            <Avatar>
              <PersonIcon className={classes.icon} />
            </Avatar>
          )
        }
      />
    );
  };

  const TimeCell = ({ value }) => {
    return (
      <div className={classes.timeCell}>
        {value == undefined ? "" : `${value.start_hour} — ${value.end_hour}`}
      </div>
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

  const BodyRow = ({ scheduleData }) => {
    const columns = days.map((day) => format(day, "EEEE").toUpperCase());
    columns.unshift("USER");
    return scheduleData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((data, idx) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={idx}
            className={classes.body}
          >
            {columns.map((column, idx) => {
              return (
                <TableCell
                  key={idx}
                  // BUGGY LISTENER NEEDS FIX
                  onClick={() => handleClick(data[idx])}
                >
                  {idx === 0 ? (
                    <UserCell value={data[idx]} />
                  ) : (
                    <TimeCell value={data[idx]} />
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
            {/* THIS IS THE CORRECT PROPS */}
            <BodyRow scheduleData={scheduleData} />
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
