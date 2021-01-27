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

  const dispatch = useDispatch();
  useEffect(() => {
    const id = organization.id;
    fetch(`http://localhost:3000/organizations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_USERS", users: data.users });
        const dataInput = data.users.map((user) => {
          return createData(
            user.avatar,
            user.first_name,
            user.last_name,
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

  const handleEdit = async (oldData, newData) => {
    const e = users.find((user) => user.email === oldData.email);
    const options = {
      method: "PATCH",
      body: JSON.stringify(newData),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    };
    // First Get The User ID
    const u = await fetch(
      `http://localhost:3000/employees/${e.id}`
    ).then((res) => res.json());
    // Then update the correct user
    const result = await fetch(
      `http://localhost:3000/users/${u.user.id}`,
      options
    ).then((res) => res.json());
    dispatch({ type: "UPDATE_USERS", user: result });
  };

  const handleDelete = async (oldData) => {
    const e = users.find((user) => user.email === oldData.email);
    const options = {
      method: "DELETE",
    };
    // First Get The User ID
    const u = await fetch(
      `http://localhost:3000/employees/${e.id}`
    ).then((res) => res.json());
    // Then destroy the correct user
    await fetch(`http://localhost:3000/users/${u.user.id}`, options);
    dispatch({ type: "DELETE_USER", user: u });
  };

  const columns = [
    {
      title: "Profile",
      field: "avatar",
      export: false,
      render: (rowData) => <Avatar src={rowData.avatar} />,
    },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: "phone_number" },
  ];

  const createData = (avatar, first_name, last_name, email, phone_number) => {
    return { avatar, first_name, last_name, email, phone_number };
  };

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
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...employees];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                handleEdit(oldData, newData);
                setEmployees([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...employees];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                handleDelete(oldData);
                setEmployees([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
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
