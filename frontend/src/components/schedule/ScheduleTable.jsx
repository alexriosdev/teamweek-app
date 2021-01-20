import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  fetchDateSchedule,
  fetchMembers,
  updateSchedule,
  createSchedule,
} from "../../actions/apiActions";

// SCHEDULE USING THE MATERIALTABLE

const ScheduleTable = ({ days }) => {
  const users = useSelector((state) => state.userState.users);
  const schedules = useSelector((state) => state.scheduleState.schedules);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchMembers(dispatch);
    for (let i = 0; i < days.length; i++) {
      let date = format(days[i], "P");
      fetchDateSchedule(dispatch, { format_date: date });
    }
  }, []);

  const createField = (date) => {
    return {
      title: format(date, "dd EEE"),
      field: format(date, "EEE").toLowerCase(),
    };
  };

  const UserCard = (data) => {
    const fullName = `${data.user.first_name} ${data.user.last_name}`;
    return (
      <Chip
        onClick={() => alert("HLLO")}
        label={fullName}
        avatar={data.user.avatar ? <Avatar src={data.user.avatar} /> : false}
      />
    );
  };

  const userField = {
    title: "Name",
    field: "user",
    render: ({ user }) => {
      return <UserCard user={user} />;
    },
  };

  const columns = days.map((day) => createField(day));
  columns.unshift(userField);

  const createRow = (user, sun, mon, tue, wed, thu, fri, sat) => {
    return { user, sun, mon, tue, wed, thu, fri, sat };
  };

  const time = {
    start_hour: "10",
    end_hour: "10:50PM",
  };

  const hour = `${time.start_hour} - ${time.end_hour}`;

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

  const date = `${format(days[0], "MMMM dd")} — ${format(
    days[days.length - 1],
    "dd, yyyy"
  )}`;

  return (
    <MaterialTable
      title={date}
      columns={columns}
      data={dataInput}
      options={options}
    />
  );
};

export default ScheduleTable;
