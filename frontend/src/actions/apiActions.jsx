const URL = "http://localhost:3000";

// User Log In
const userLogin = async (dispatch, user, history) => {
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
  const response = await fetch(`${URL}/login`, options);
  const data = await response.json();
  if (data.hasOwnProperty("auth_key")) {
    localStorage.setItem("token", data.auth_key);
    dispatch({ type: "SET_CURRENT_USER", user: data });
    history.push("/");
  } else {
    alert(data.error);
  }
};

// User Sign Up
const userSignup = async (dispatch, user, history) => {
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
  const response = await fetch(`${URL}/signup`, options);
  const data = await response.json();
  if (data.hasOwnProperty("auth_key")) {
    localStorage.setItem("token", data.auth_key);
    dispatch({ type: "SET_CURRENT_USER", user: data });
    history.push("/");
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
const fetchMembers = async (dispatch) => {
  const response = await fetch(URL + "/organizations/1"); //
  const data = await response.json();
  dispatch({ type: "SET_USERS", users: data.users });
};

// Fetch schedules from a patricular date
const fetchDateSchedule = async (dispatch, date) => {
  const options = {
    method: "POST",
    body: JSON.stringify(date),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
  const response = await fetch(URL + "/date_request", options);
  const data = await response.json();
  data
    ? dispatch({ type: "SET_SCHEDULES", schedules: data })
    : console.log("Data is null");
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

export { userLogin, userSignup, fetchUsers, fetchMembers, fetchDateSchedule };
