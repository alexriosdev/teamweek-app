const initialState = {
  users: [],
  currentUser: {
    id: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.user,
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.user.id) {
            return action.user;
          } else {
            return user;
          }
        }),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => {
          return !(user.id === action.user.id);
        }),
      };
    default:
      return state;
  }
};
export default userReducer;
