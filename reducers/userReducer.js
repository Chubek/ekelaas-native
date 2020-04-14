import * as CONSTANTS from "../constants";

const initialState = {
  token: null,
  isLoggedIn: !!token,
  userData: {
    userId: null,
    phoneNumber: null,
    displayName: null,
  },
  info: {
    firstName: null,
    lastName: null,
    dateOfBirth: null,
  },
  type: null,
  loadedUser: {
    userId: null,
    userPhoneNumber: null,
    userType: null,
    userInfo: null,
    typeInfo: null,
  },
  autoCompleteUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CONSTANTS.SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case CONSTANTS.SET_USER_DATA:
      return {
        ...state,
        userData: {
          userId: action.payload._id,
          displayName: action.payload.displayName,
          phoneNumber: action.payload.phoneNumber,
        },
      };
    case CONSTANTS.SET_USER_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case CONSTANTS.SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case CONSTANTS.SET_LOADED_USER_DATA:
      return {
        ...state,
        loadedUser: {
          userId: action.payload._id,
          phoneNumber: action.payload.phoneNumber,
          type: "Not Set",
          userInfo: action.payload.info,
          typeInfo: null,
        },
      };
    case CONSTANTS.SET_LOADED_STUDENT_DATA:
      return {
        ...state,
        loadedUser: {
          userId: action.payload.res._id,
          phoneNumber: action.payload.res.phoneNumber,
          type: "Student",
          userInfo: action.payload.res.info,
          typeInfo: action.payload.resStudent.info,
        },
      };
    case CONSTANTS.SET_LOADED_TEACHER_DATA:
      return {
        ...state,
        loadedUser: {
          userId: action.payload.res._id,
          phoneNumber: action.payload.res.phoneNumber,
          type: "Teacher",
          userInfo: action.payload.res.info,
          typeInfo: action.payload.resTeacher.info,
        },
      };
    case CONSTANTS.SET_AUTOCOMPLETE_USERS:
      return {
        ...state,
        autoCompleteUsers: pushAutoCompleteUsers(action.payload),
      };
    default:
      return state;
  }
};

function pushAutoCompleteUsers(users) {
  let ret = [];
  users.forEach((user) => {
    if (user.types.type === "Student") {
      if (user.info.firstName || user.info.lastName) {
        ret.push(
          user.displayName +
            " (" +
            user.info.firstName +
            " " +
            user.info.lastName +
            ")"
        );
      }
    }
  });

  return ret;
}

export default userReducer;
