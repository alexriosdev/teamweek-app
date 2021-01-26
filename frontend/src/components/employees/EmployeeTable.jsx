import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Avatar, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../actions/apiActions";
import CreateEmployee from "../dialogs/CreateEmployee";

const EmployeeTable = () => {
  const users = useSelector((state) => state.userState.users);
  const organization = useSelector(
    (state) => state.organizationState.organization
  );
  const [employees, setEmployees] = useState([]);

  const id = organization.id;
  useEffect(() => {
    fetch(`http://localhost:3000/organizations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const dataInput = data.users.map((user) => {
          const fullName = `${user.first_name} ${user.last_name}`;
          return createData(
            user.avatar,
            fullName,
            user.email,
            user.phone_number
          );
        });
        setEmployees(dataInput);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const columns = [
    {
      title: "Profile",
      field: "avatar",
      export: false,
      render: (rowData) => <Avatar src={rowData.avatar} />,
    },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: "phone_number" },
  ];

  const createData = (avatar, name, email, phone_number) => {
    return { avatar, name, email, phone_number };
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
    <>
      <MaterialTable
        title={`${organization.name} Employees`}
        columns={columns}
        data={employees}
        options={options}
      />
      <br />
      <Button onClick={openDialog} variant="contained" color="primary">
        Create Employee
      </Button>
      {open ? (
        <CreateEmployee
          close={closeDialog}
          organization={organization}
          employees={employees}
          setEmployees={setEmployees}
        />
      ) : null}
    </>
  );
};

export default EmployeeTable;
