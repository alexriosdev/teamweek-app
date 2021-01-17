const initialState = {
  schedules: [],
  currentSchedule: {
    id: null,
  },
};

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCHEDULES":
      // Returns only unique values
      const values = [...state.schedules, action.schedules];
      const uniqueValues = Array.from(new Set(values.map((v) => v.id))).map(
        (id) => {
          return values.find((v) => v.id === id);
        }
      );
      return {
        ...state,
        // schedules: [...state.schedules, action.schedules],
        schedules: uniqueValues,
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
