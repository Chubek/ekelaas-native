import * as CONSTANTS from "../constants";
import axios from "axios";

export function loginSchool(loginData) {
  return function (dispatch) {
    return axios
      .post("https://www.ekelaas.com/school/auth", {
        idName: loginData.displayName,
        mobileNumber: loginData.phoneNumber,
        password: loginData.password,
      })
      .then(({ res }) => {
        dispatch(
          setSchoolData({
            schoolId: res.data.docSchool._id,
            idName: res.data.docSchool.idName,
            email: res.data.docSchool.email,
            mobileNumber: res.data.docSchool.mobileNumber,
          })
        );
        if (res.data.docSchool.info) {
          dispatch(setSchoolInfo(res.data.docSchool.info));
        }
        dispatch(loadSchoolStudents(res.data.docSchool._id));
        dispatch(loadSchoolCourses(res.data.docSchool._id));
        dispatch(loadSchoolTeachers(res.data.docSchool._id));
        dispatch(setSchoolToken(res.data.token));
        dispatch(setSchoolLoggedIn(true));
      });
  };
}

export function registerSchool(registerData) {
  return function (dispatch) {
    return axios
      .post("https://www.ekelaas.com/school/register", {
        idName: registerData.displayName,
        mobileNumber: registerData.phoneNumber,
        password: registerData.password,
      })
      .then(({ res }) => {
        dispatch(setSchoolData(res));
      });
  };
}

export function loadSchool(schoolId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/school/single/${schoolId}`)
      .then(({ res }) => {
        dispatch(setSchoolData(res.data.docSchool));
        dispatch(setSchoolInfo(res.data.docSchool.info));
        dispatch(loadSchoolStudents(res.data.docSchool._id));
        dispatch(loadSchoolCourses(res.data.docSchool._id));
        dispatch(loadSchoolTeachers(res.data.docSchool._id));
      });
  };
}

export function loadSchoolStudents(schoolId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/school/all/students/${schoolId}`)
      .then(({ res }) => {
        dispatch(
          pushToSchoolStudents({
            studentDocs: res.data.studentDocs,
            userDocs: res.data.userDocs,
          })
        );
      });
  };
}

export function loadSchoolCourses(schoolId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/school/all/courses/${schoolId}`)
      .then(({ res }) => {
        dispatch(pushToSchoolCourses(res.data.courseDocs));
      });
  };
}

export function loadSchoolTeachers(schoolId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/school/all/teachers/${schoolId}`)
      .then(({ res }) => {
        dispatch(
          pushToSchoolTeachers({
            teacherDocs: res.data.teacherDocs,
            userDocs: res.data.userDocs,
          })
        );
      });
  };
}

export function pushToSchoolCourses(courses) {
  return {
    type: CONSTANTS.PUSH_TO_SCHOOL_COURSES,
    payload: courses,
  };
}

export function pushToSchoolStudents(students) {
  return {
    type: CONSTANTS.PUSH_TO_SCHOOL_STUDENTS,
    payload: students,
  };
}

export function pushToSchoolTeachers(teachers) {
  return {
    type: CONSTANTS.PUSH_TO_SCHOOL_TEACHERS,
    payload: teachers,
  };
}

export function loadAutoCompleteSchools() {
  return function (dispatch) {
    return axios.get("https://www.ekelaas.com/school/all").then(({ res }) => {
      dispatch(setAutoCompleteSchools(res.data.docSchools));
    });
  };
}

export function setAutoCompleteSchools(schools) {
  return {
    type: CONSTANTS.SET_AUTOCOMPLETE_SCHOOLS,
    payload: schools,
  };
}

export function setSchoolToken(token) {
  return {
    types: CONSTANTS.SET_SCHOOL_TOKEN,
    payload: token,
  };
}

export function editSchoolInfo(schoolInfo) {
  return function (dispatch, getState) {
    const schoolToken = getState().school.schoolToken;
    return axios
      .put(
        "https://www.ekelaas.com/school/set/info",
        {
          name: schoolInfo.name,
          grade: schoolInfo.grade,
          landlineNumber: schoolInfo.landlineNumber,
          address: schoolInfo.address,
        },
        { headers: { "x-auth-token": schoolToken } }
      )
      .then(() => {
        dispatch(setSchoolInfo(schoolInfo));
      });
  };
}

export function setSchoolInfo(schoolInfo) {
  return {
    types: CONSTANTS.SET_SCHOOL_INFO,
    payload: schoolInfo,
  };
}

export function setSchoolLoggedIn(loggedIn) {
  return {
    type: CONSTANTS.SET_SCHOOL_LOGGED_IN,
    payload: loggedIn,
  };
}

export function logOutSchool() {
  return function (dispatch) {
    dispatch(setSchoolLoggedIn(false));
  };
}

export function deleteFromSchoolCourses(courseIndex, courseId) {
  return function (dispatch, getState) {
    const schoolToken = getState().school.token;
    return axios
      .delete(`https://www.ekelaas.com/delete/course/${courseId}`, {
        headers: { "x-auth-token-school": schoolToken },
      })
      .then(() => {
        dispatch(removeFromSchoolCourses(courseIndex));
      });
  };
}

export function deleteFromSchoolStudents(studentIndex, studentId) {
  return function (dispatch, getState) {
    const schoolToken = getState().school.token;
    return axios
      .delete(`https://www.ekelaas.com/delete/student/${studentId}`, {
        headers: { "x-auth-token-school": schoolToken },
      })
      .then(() => {
        dispatch(removeFromSchoolStudents(studentIndex));
      });
  };
}

export function deleteFromSchoolTeachers(teacherIndex, teacherId) {
  return function (dispatch, getState) {
    const schoolToken = getState().school.token;
    return axios
      .delete(`https://www.ekelaas.com/delete/teacher/${teacherId}`, {
        headers: { "x-auth-token-school": schoolToken },
      })
      .then(() => {
        dispatch(removeFromSchoolTeachers(teacherIndex));
      });
  };
}

export function removeFromSchoolCourses(courseIndex) {
  return {
    type: CONSTANTS.REMOVE_FROM_SCHOOL_COURSES,
    payload: courseIndex,
  };
}

export function removeFromSchoolStudents(studentIndex) {
  return {
    type: CONSTANTS.REMOVE_FROM_SCHOOL_STUDENTS,
    payload: studentIndex,
  };
}

export function removeFromSchoolTeachers(teacherIndex) {
  return {
    type: CONSTANTS.REMOVE_FROM_SCHOOL_TEACHERS,
    payload: teacherIndex,
  };
}
