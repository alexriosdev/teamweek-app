import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../actions/apiActions";

const EmployeeTable = () => {
  const users = useSelector((state) => state.userState.users);
  const organization = useSelector((state) => state.userState.organization);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchEmployees(dispatch);
  }, []);

  const columns = [
    {
      title: "Profile",
      field: "avatar",
      export: false,
      render: (rowData) => <Avatar src={rowData.avatar} />,
    },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: "phone" },
  ];

  const createData = (avatar, name, email, phone) => {
    return { avatar, name, email, phone };
  };

  // Create Table Rows
  const dataInput = users.map((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return createData(user.avatar, fullName, user.email, user.phone_number);
  });

  const theme = useTheme();
  const options = {
    exportButton: true,
    headerStyle: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  };

  return (
    <MaterialTable
      title={`${organization.name} Employees`}
      columns={columns}
      data={dataInput}
      options={options}
    />
  );
};

export default EmployeeTable;
