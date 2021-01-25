import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format, parse } from "date-fns";
import { updateSchedule } from "../../actions/apiActions";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
}));

const ChangeSchedule = ({
  close,
  shift,
  position,
  scheduleData,
  setScheduleData,
}) => {
  const classes = useStyles();

  const handleEdit = (value) => {
    const newData = [...scheduleData];
    newData[position.i].schedules[position.j] = value;
    setScheduleData(newData);
  };

  let initialState = {
    start: new Date(),
    end: new Date(),
  };

  if (shift.start_time) {
    initialState = {
      start: parse(shift.start_time, "p", new Date()),
      end: parse(shift.end_time, "p", new Date()),
    };
  }

  const [start, setStart] = useState(initialState.start);
  const [end, setEnd] = useState(initialState.end);

  const updateShift = (availability) => {
    if (availability) {
      return (shift = {
        ...shift,
        is_available: availability,
        start_time: format(start, "p"),
        end_time: format(end, "p"),
      });
    } else {
      shift = {
        ...shift,
        is_available: availability,
      };
    }
  };

  const handleSave = () => {
    updateShift(true);
    handleEdit(shift);
    updateSchedule(shift);
    close();
  };

  const handleDayOff = () => {
    updateShift(false);
    handleEdit(shift);
    updateSchedule(shift);
    close();
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={close}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Change Shift</DialogTitle>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DialogContent>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              name="startTime"
              label="Start Time"
              value={start}
              onChange={setStart}
              minutesStep={5}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </DialogContent>
          <DialogContent>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              name="endTime"
              label="End Time"
              value={end}
              onChange={setEnd}
              minutesStep={5}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </DialogContent>
        </MuiPickersUtilsProvider>
        <DialogActions>
          <Button onClick={() => handleDayOff()} className={classes.button}>
            Clear
          </Button>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangeSchedule;
