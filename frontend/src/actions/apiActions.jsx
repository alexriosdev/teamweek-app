import auth from "../components/auth/auth";
const URL = "http://localhost:3000";

// Helper POST Method
const methodPost = (data) => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
};

// Helper PATCH Method
const methodPatch = (data) => {
  return {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
};

// User Log In
const userLogin = async (dispatch, user, history) => {
  const response = await fetch(`${URL}/login`, methodPost(user));
  const data = await response.json();
  if (data.hasOwnProperty("auth_key")) {
    localStorage.setItem("token", data.auth_key);
    dispatch({ type: "SET_CURRENT_USER", user: data.user });
    auth.login(() => {
      history.push("/dashboard");
    });
  } else {
    alert(data.error);
  }
};

// User Sign Up
const userSignup = async (dispatch, user, history) => {
  const response = await fetch(`${URL}/signup`, methodPost(user));
  const data = await response.json();
  if (data.hasOwnProperty("auth_key")) {
    localStorage.setItem("token", data.auth_key);
    dispatch({ type: "SET_CURRENT_USER", user: data.user });
    auth.login(() => {
      history.push("/dashboard");
    });
    // history.push("/dashboard");
  } else {
    alert(data.error);
  }
};

const fetchOrganizations = async (dispatch) => {
  const response = await fetch(`${URL}/organizations`);
  const data = await response.json();
  dispatch({ type: "SET_ORGANIZATIONS", organizations: data });
  return data;
};

// Fetch All Users
const fetchUsers = async (dispatch) => {
  const response = await fetch(`${URL}/users`);
  const data = await response.json();
  return dispatch({ type: "SET_USERS", users: data });
};

// Fetch users from a particular organization
const fetchEmployees = async (dispatch, id) => {
  const response = await fetch(`${URL}/organizations/${id}`);
  const data = await response.json();
  const organization = {
    name: data.name,
    id: data.id,
  };
  dispatch({ type: "SET_USERS", users: data.users });
  dispatch({ type: "SET_ORGANIZATION", organization: organization });
};

// Create an Employee
const createEmployee = async (dispatch, data) => {
  // First Create The user
  const user = await fetch(URL + "/users", methodPost(data.user)).then((res) =>
    res.json()
  );
  // Then Create The Employee
  const employee = { user_id: user.id, organization_id: data.org_id };
  const e = await fetch(URL + "/employees", methodPost(employee)).then((res) =>
    res.json()
  );
  // Then Create The Week Schedule for the Employee
  const schedule = { employee_id: e.id, work_week_id: data.ww_id };
  await fetch(URL + "/create_schedules", methodPost(schedule)).then((res) =>
    res.json()
  );
  dispatch({ type: "UPDATE_USERS", user: user });
};

// Fetches the Working Schedule for a particular Week
const fetchWorkWeek = async (dispatch, obj) => {
  const response = await fetch(URL + "/week_request", methodPost(obj));
  const data = await response.json();
  data.week_schedule
    ? dispatch({ type: "SET_SCHEDULES", schedules: data.week_schedule }) &&
      dispatch({ type: "SET_WORK_WEEK_ID", work_week_id: data.id })
    : console.log("Unable to fetch Week Schedule");
};

// Create a Schedule
const createSchedule = async (date, schedule) => {
  schedule = {
    user_id: 3,
    calendar_date_id: date.id,
    is_available: true,
    start_time: "TESTING",
    end_time: "POST",
  };
  console.log(schedule);
  const response = await fetch(`${URL}/schedules`, methodPost(schedule));
  const data = await response.json();
};

// Updates a Schedule
const updateSchedule = async (schedule) => {
  console.log(`${URL}/schedules/${schedule.id}`);
  const response = await fetch(
    `${URL}/schedules/${schedule.id}`,
    methodPatch(schedule)
  );
  const data = await response.json();
};

// // Previous Method to Fetch Users
// const fetchUsers = async (dispatch) => {
//   await fetch("http://localhost:3000/users")
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch({ type: "SET_USERS", users: data });
//     })
//     .catch((error) => console.log(error));
// };

export {
  userLogin,
  userSignup,
  fetchOrganizations,
  fetchUsers,
  fetchEmployees,
  fetchWorkWeek,
  createEmployee,
  createSchedule,
  updateSchedule,
};
