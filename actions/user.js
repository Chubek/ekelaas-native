import * as CONSTANTS from "../constants";
import axios from "axios";
import { loadStudent } from "./student";
import { loadTeacher } from "./teacher";

export function loginUser(loginData) {
  return function (dispatch) {
    return axios
      .post("https://www.ekelaas.com/user/auth", {
        displayName: loginData.displayName,
        phoneNumber: loginData.phoneNumber,
        password: loginData.password,
      })
      .then(({ res }) => {
        dispatch(
          setUserData({
            userId: res.data.docUser._id,
            displayName: res.data.docUser.displayName,
            email: res.data.docUser.email,
            phoneNumber: res.data.docUser.phoneNumber,
            verified: res.data.docUser.verified,
          })
        );
        if (res.data.docUser.info) {
          dispatch(setUserInfo(res.data.docUser.info));
        }
        if (res.data.docUser.types.type === "Student") {
          dispatch(loadStudent(res.data.docUser.types.studentId));
          dispatch(setType, "Student");
        } else if (res.data.docUser.types.type === "Teacher") {
          dispatch(loadTeacher(res.data.docUser.types.teacherId));
          dispatch(setType, "Teacher");
        }
        dispatch(setToken(res.data.token));
      });
  };
}

export function registerUser(registerData) {
  return function (dispatch) {
    return axios
      .post("https://www.ekelaas.com/user/register", {
        displayName: registerData.displayName,
        phoneNumber: registerData.phoneNumber,
        password: registerData.password,
      })
      .then(() => {
        dispatch(loginUser(registerData));
      });
  };
}

export function loadUser(userId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/user/single/${userId}`)
      .then(({ res }) => {
        if (res.data.userDoc.types.type === "Student") {
          axios.get(
            `https://www.ekelaas.com/student/single/${res.data.userDoc.types.studentId}`
          );
          then(({ resStudent }) => {
            dispatch(setLoadedStudentData({ res, resStudent }));
          });
        } else if (res.data.userDoc.types.type === "Teacher") {
          axios.get(
            `https://www.ekelaas.com/student/single/${res.data.userDoc.types.teacherId}`
          );
          then(({ resTeacher }) => {
            dispatch(setLoadedStudentData({ res, resTeacher }));
          });
        } else if (res.data.userDoc.types.type === "Not Set") {
          dispatch(setLoadedUserData(res));
        }
      });
  };
}

export function editUserInfo(userInfo) {
  return function (dispatch, getState) {
    const token = getState().user.token;
    return axios
      .put(
        "https://www.ekelaas.com/user/set/info",
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          dateOfBirth: userInfo.dateOfBirth,
        },
        { headers: { "x-auth-token": token } }
      )
      .then(() => {
        dispatch(setUserInfo(userInfo));
      });
  };
}

export function setStudent(studentId) {
  return {
    type: CONSTANTS.SET_STUDENT,
    payload: studentId,
  };
}

export function setTeacher(teacherId) {
  return {
    type: CONSTANTS.SET_TEACHER,
    payload: teacherId,
  };
}

export function loadAutoCompleteUsers() {
  return function (dispatch) {
    return axios.get("https://www.ekelaas.com/user/all").then(({ res }) => {
      dispatch(setAutoCompleteUsers(res.data.docUsers));
    });
  };
}

export function setAutoCompleteUsers(users) {
  return {
    type: CONSTANTS.SET_AUTOCOMPLETE_USERS,
    payload: users,
  };
}

export function setUserData(userData) {
  return {
    type: CONSTANTS.SET_USER_DATA,
    payload: userData,
  };
}

export function setLoadedStudentData(loadedUserData) {
  return {
    type: CONSTANTS.SET_LOADED_STUDENT_DATA,
    payload: loadedUserData,
  };
}

export function setLoadedTeacherData(loadedUserData) {
  return {
    type: CONSTANTS.SET_LOADED_TEACHER_DATA,
    payload: loadedUserData,
  };
}

export function setLoadedUserData(loadedUserData) {
  return {
    type: CONSTANTS.SET_LOADED_USER_DATA,
    payload: loadedUserData,
  };
}

export function setType(type) {
  return {
    type: CONSTANTS.SET_TYPE,
    payload: type,
  };
}

export function setToken(token) {
  return {
    type: CONSTANTS.SET_TOKEN,
    payload: token,
  };
}
