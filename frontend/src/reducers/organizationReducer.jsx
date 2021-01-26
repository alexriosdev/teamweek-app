const initialState = {
  organizations: [],
  organization: null,
};

const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORGANIZATIONS":
      return {
        ...state,
        organizations: action.organizations,
      };
    case "SET_ORGANIZATION":
      return {
        ...state,
        organization: action.organization,
      };
    case "UPDATE_ORGANIZATIONS":
      return {
        ...state,
        organizations: state.organizations.map((organization) => {
          if (organization.id === action.organization.id) {
            return action.organization;
          } else {
            return organization;
          }
        }),
      };
    case "DELETE_ORGANIZATION":
      return {
        ...state,
        organizations: state.organizations.filter((organization) => {
          return !(organization.id === action.organization.id);
        }),
      };
    default:
      return state;
  }
};
export default organizationReducer;
