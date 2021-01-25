import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { useTheme } from "@material-ui/core/styles";
import { format } from "date-fns";

// SCHEDULE USING MATERIAL-TABLE

const ScheduleTable = ({ days, schedules }) => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const initialData = schedules.map((e) => {
      return createRow(
        `${e.user.first_name} ${e.user.last_name}`,
        `${e.schedules[0].start_time} - ${e.schedules[0].end_time}`,
        `${e.schedules[1].start_time} - ${e.schedules[1].end_time}`,
        `${e.schedules[2].start_time} - ${e.schedules[2].end_time}`,
        `${e.schedules[3].start_time} - ${e.schedules[3].end_time}`,
        `${e.schedules[4].start_time} - ${e.schedules[4].end_time}`,
        `${e.schedules[5].start_time} - ${e.schedules[5].end_time}`,
        `${e.schedules[6].start_time} - ${e.schedules[6].end_time}`
      );
    });
    setScheduleData(initialData);
  }, [schedules]);

  const createRow = (user, sun, mon, tue, wed, thu, fri, sat) => {
    return { user, sun, mon, tue, wed, thu, fri, sat };
  };

  const createField = (date) => {
    const d_key = format(date, "EEE").toLowerCase();
    return {
      title: format(date, "dd EEE"),
      field: d_key,
      align: "center",

      // render: (data) => {
      //   return <TimeCell day={data[d_key]} />;
      // },
    };
  };

  const userField = {
    title: "Name",
    field: "user",
    editable: "never",
    // render: ({ user }) => {
    //   return <UserCell user={user} />;
    // },
  };

  const columns = days.map((day) => createField(day));
  columns.unshift(userField);

  const UserCell = ({ user }) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return (
      <Chip
        onClick={() => alert("CLICKED ON EMPLOYEE")}
        label={fullName}
        avatar={user.avatar ? <Avatar src={user.avatar} /> : false}
      />
    );
  };

  const TimeCell = ({ day }) => {
    if (day) {
      return `${day.start_time} — ${day.end_time}`;
    } else {
      return (
        <div align="center" style={{ background: "gray" }}>
          OFF
        </div>
      );
    }
  };

  // Sample Data
  const users = [1, 2, 2];
  const time = { start_time: "10", end_time: "10:50PM" };
  const hour = `${time.start_time} - ${time.end_time}`;
  const dataInput = users.map((user) => {
    return createRow(user, hour, hour, hour, hour, hour, hour, hour);
  });

  const theme = useTheme();
  const options = {
    exportButton: true,
    headerStyle: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  };
  const titleStyle = {
    Toolbar: (props) => (
      <div style={{ color: theme.palette.primary.main }}>
        <MTableToolbar {...props} />
      </div>
    ),
  };

  const title = `${format(days[0], "MMMM dd")} — ${format(
    days[days.length - 1],
    "dd, yyyy"
  )}`;

  const handleEdit = (index, field, newValue) => {
    const newData = [...scheduleData];
    console.log(newData[index][field]);
    newData[index][field] = newValue;
    setScheduleData(newData);
  };

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={scheduleData}
      options={options}
      // components={titleStyle}
      cellEditable={{
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
          return new Promise((resolve, reject) => {
            const index = rowData.tableData.id;
            const field = columnDef.field;
            handleEdit(index, field, newValue);
            setTimeout(resolve, 1000);
          });
        },
      }}
    />
  );
};

export default ScheduleTable;
