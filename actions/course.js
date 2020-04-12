import * as CONSTANTS from "../constants";

export function setUpCourse(courseData) {
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .post(
        "https://www.ekelaas.com/course/setup",
        {
          subject: courseData.subject,
          description: courseData.description,
          city: courseData.city,
          school: courseData.school,
          schoolId: courseData.schoolId,
        },
        { headers: { "x-auth-token": token } }
      )
      .then(({ res }) => {
        dispatch(setCourseInfo(courseData));
        dispatch(setCourseData(res.data.courseDoc));
      });
  };
}

export function setCourseInfo(courseData) {
  return {
    type: CONSTANTS.SET_COURSE_INFO,
    payload: courseData,
  };
}
export function editCourse(courseData) {
  return function (dispatch, getState) {
    const courseId = getState().course.courseId;
    const token = getState().user.token;
    axios
      .put(`http://wwww.ekelaas.com/course/set/info/${courseId}`, courseData, {
        headers: { "x-auth-token": token },
      })
      .then(() => {
        dispatch(setCourseInfo(courseData));
      });
  };
}

export function loadCourse(courseId) {
  return function (dispatch) {
    return axios
      .get(`https://www.ekelaas.com/course/single/${courseId}`)
      .then(({ res }) => {
        dispatch(setCourseInfo(res.data.courseDoc.info));
        dispatch(setCourseData(res.data.courseDoc));
      });
  };
}

export function pushCourseClasses(classData) {
  return {
    type: CONSTANTS.PUSH_COURSE_CLASSES,
    payload: classData,
  };
}

export function addCourseClasses(classData) {
  return function (dispatch, getState) {
    const token = getState().user.token;
    return axios
      .put(
        `https://www.ekelaas.com/course/add/class/${classData.courseId}`,
        {
          classDate: classData.classData,
          classHour: classData.classHour,
          classParticipants: classData.classParticipants,
          classNotes: classData.classNotes,
        },
        { headers: { "x-auth-token": token } }
      )
      .then(() => {
        dispatch(pushCourseClasses(classData));
      });
  };
}

export function editCourseClasses(classData) {
  return {
    type: CONSTANTS.EDIT_COURSE_CLASSES,
    payload: classData,
  };
}

export function deleteCourseClass(payload) {
  return function (dispatch, getState) {
    const token = getState().user.token;
    return axios
      .put(
        `httos://www.ekelaas.com/course/remove/class/${payload.courseId}/${payload.classIndex}`,
        {
          headers: { "x-auth-token": token },
        }
      )
      .then(() => {
        dispatch(removeFromCourseClasses(payload.classIndex));
      });
  };
}

export function removeFromCourseClasses(classId) {
  return {
    type: CONSTANTS.REMOVE_FROM_COURSE_CLASSES,
    payload: classId,
  };
}

export function setCourseData(courseData) {
  return {
    data: CONSTANTS.SET_COURSE_DATA,
    payload: courseData,
  };
}
