const initialState = {
  schedules: [],
  currentSchedule: {
    id: null,
  },
};

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCHEDULES":
      return {
        ...state,
        schedules: action.schedules,
      };
    case "SET_CURRENT_SCHEDULE":
      return {
        ...state,
        currentSchedule: action.schedule,
      };
    case "UPDATE_SCHEDULES":
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id === action.schedule.id) {
            return action.schedule;
          } else {
            return schedule;
          }
        }),
      };
    case "DELETE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.filter((schedule) => {
          return !(schedule.id === action.schedule.id);
        }),
      };
    default:
      return state;
  }
};
export default scheduleReducer;
