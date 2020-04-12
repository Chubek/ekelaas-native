import * as CONSTANTS from "../constants";

export function setUpTeacher(teacherData) {
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .post(
        "https://www.ekelaas.com/teacher/setup",
        {
          credits: teacherData.credits,
          degrees: teacherData.degrees,
          school: teacherData.school,
          schoolId: teacherData.schoolId,
        },
        { headers: { "x-auth-token": token } }
      )
      .then(({ res }) => {
        dispatch(setTeacherInfo(teacherData));
        dispatch(setTeacherData(res.data.teacherDoc))
      });
  };
}

export function setTeacherInfo(teacherData) {
  return {
    type: CONSTANTS.SET_TEACHER_INFO,
    payload: teacherData,
  };
}

export function editTeacher(teacherData) {
  return function (dispatch, getState) {
    const teacherId = getState().teacher.teacherId;
    const token = getState().user.token;
    axios
      .put(
        `http://wwww.ekelaas.com/teacher/set/info/${teacherId}`,
        teacherData,
        { headers: { "x-auth-token": token } }
      )
      .then(() => {
        dispatch(setTeacherInfo(teacherData));
      });
  };
}

export function loadTeacher(teacherId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/teacher/single/${teacherId}`)
      .then(({ res }) => {
        dispatch(setTeacherInfo(res.data.teacherDoc.info));
      });
  };
}

export function setTeacherData(teacherData) {
  return {
    data: CONSTANTS.SET_TEACHER_DATA,
    payload: teacherData,
  };
}
