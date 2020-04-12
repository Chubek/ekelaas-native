import * as CONSTANTS from "../constants";

export function setUpStudent(studentData) {
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .post(
        "https://www.ekelaas.com/student/setup",
        {
          grade: studentData.grade,
          province: studentData.province,
          city: studentData.city,
          school: studentData.school,
          schoolId: studentData.schoolId,
        },
        { headers: { "x-auth-token": token } }
      )
      .then(({ res }) => {
        dispatch(setStudentInfo(studentData));
        dispatch(setStudentData(res.data.studentDOc));
      });
  };
}

export function setStudentInfo(studentData) {
  return {
    type: CONSTANTS.SET_STUDENT_INFO,
    payload: studentData,
  };
}

export function editStudent(studentData) {
  return function (dispatch, getState) {
    const studentId = getState().student.studentId;
    const token = getState().user.token;
    axios
      .put(
        `http://wwww.ekelaas.com/student/set/info/${studentId}`,
        studentData,
        { headers: { "x-auth-token": token } }
      )
      .then(() => {
        dispatch(setStudentInfo(studentData));
      });
  };
}

export function loadStudent(studentId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/student/single/${studentId}`)
      .then(({ res }) => {
        dispatch(setStudentInfo(res.data.studentDoc.info));
        dispatch(setStudentData(res.data.studentDOc));
      });
  };
}

export function setStudentData(studentData) {
  return {
    data: CONSTANTS.SET_STUDENT_DATA,
    payload: studentData,
  };
}
