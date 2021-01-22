import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { updateSchedule } from "../../actions/apiActions";

const ChangeSchedule = ({ close, data, setEditData }) => {
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  // console.log(data);

  const updateData = (start, end) => {
    return (data = {
      ...data,
      start_hour: format(start, "p"),
      end_hour: format(end, "p"),
    });
  };

  const handleSave = () => {
    updateData(start, end);
    // setEditData(data); // From TESTING NEW TABLE
    updateSchedule(data);
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
