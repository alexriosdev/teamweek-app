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
    dispatch({ type: "SET_CURRENT_USER", user: data });
    history.push("/dashboard");
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
    dispatch({ type: "SET_CURRENT_USER", user: data });
    history.push("/dashboard");
  } else {
    alert(data.error);
  }
};

// Fetch All Users
const fetchUsers = async (dispatch) => {
  const response = await fetch(`${URL}/users`);
  const data = await response.json();
  return dispatch({ type: "SET_USERS", users: data });
};

// Fetch users from a particular organization
const fetchEmployees = async (dispatch) => {
  const response = await fetch(URL + "/organizations/1"); //
  const data = await response.json();
  const organization = {
    name: data.name,
    id: data.id,
  };
  dispatch({ type: "SET_USERS", users: data.users });
  dispatch({ type: "SET_ORGANIZATION", organization: organization });
};

// Create a Member
const createMember = async (dispatch, user, organization) => {
  console.log("SENT DATA", user);
  const userObj = await fetch(URL + "/users", methodPost(user)).then((res) =>
    res.json()
  );
  console.log("RECEIVED USER", userObj);
  const data = {
    user_id: userObj.id,
    organization_id: organization.id,
  };
  console.log("FORMATED DATA", data);

  let memObj = await fetch(URL + "/memberships", methodPost(data)).then((res) =>
    res.json()
  );

  dispatch({ type: "UPDATE_USERS", user: userObj });
};

// Fetches the Working Schedule for a particular Week
const fetchWorkWeek = async (dispatch, date) => {
  const response = await fetch(URL + "/week_request", methodPost(date));
  const data = await response.json();
  // console.log(data.week_schedule);
  data.week_schedule
    ? dispatch({ type: "SET_SCHEDULES", schedules: data.week_schedule })
    : console.log("Unable to fetch Week Schedule");
};

// Create a Schedule
const createSchedule = async (date, schedule) => {
  schedule = {
    user_id: 3,
    calendar_date_id: date.id,
    start_hour: "TESTING",
    end_hour: "POST",
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
  fetchUsers,
  fetchEmployees,
  fetchWorkWeek,
  createMember,
  createSchedule,
  updateSchedule,
};
