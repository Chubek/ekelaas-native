import * as CONSTANTS from "../constants";

const initialState = {
  schoolToken: null,
  schoolLoggedIn: !!schoolToken,
  schoolData: {
    schoolId: null,
    mobileNumber: null,
    idName: null,
  },
  info: {
    name: null,
    grade: null,
    landlineNumber: null,
    address: null,
  },
  courses: [],
  teachers: [],
  students: [],
  autoCompleteSchools: [],
};

const schoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_SCHOOL_TOKEN:
      return {
        ...state,
        schoolToken: action.payload,
      };
    case CONSTANTS.SET_SCHOOL_DATA:
      return {
        ...state,
        schoolData: {
          schoolId: action.payload._id,
          idName: action.payload.idName,
          mobileNumber: action.payload.mobileNumber,
        },
      };
    case CONSTANTS.SET_SCHOOL_LOGGED_IN:
      return {
        ...state,
        schoolLoggedIn: action.payload,
      };
    case CONSTANTS.SET_SCHOOL_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case CONSTANTS.SET_SCHOOL_COURSES:
      return {
        ...state,
        courses: setSchoolCourses(action.payload),
      };
    case CONSTANTS.SET_SCHOOL_STUDENTS:
      return {
        ...state,
        courses: setSchoolStudents(action.payload),
      };
    case CONSTANTS.SET_SCHOOL_TEACHERS:
      return {
        ...state,
        courses: setSchoolTeachers(action.payload),
      };
    case CONSTANTS.SET_AUTOCOMPLETE_SCHOOLS:
      return {
        ...state,
        autoCompleteSchools: pushAutoCompleteSchools(action.payload),
      };
    case CONSTANTS.REMOVE_FROM_SCHOOL_COURSES:
      return {
        ...state,
        courses: courses.splice(action.payload, 1),
      };
    case CONSTANTS.REMOVE_FROM_SCHOOL_STUDENTS:
      return {
        ...state,
        students: students.splice(action.payload, 1),
      };
    case CONSTANTS.REMOVE_FROM_SCHOOL_TEACHERS:
      return {
        ...state,
        teachers: teachers.splice(action.payload, 1),
      };
    default:
      return state;
  }
};

function setSchoolTeachers(teachers) {
  let ret = [];
  teachers.teacherDocs.forEach((teacher, index) => {
    ret.push({
      teacherId: teacher._id,
      userId: teachers.userDocs[index]._id,
      firstName: teachers.userDocs[index].info.firstName,
      lastName: teachers.userDocs[index].info.lastName,
      schoolId: teacher.schoolId,
    });
  });
  return ret;
}

function setSchoolStudents(students) {
  let ret = [];
  students.studentDocs.forEach((student, index) => {
    ret.push({
      studentId: teacher._id,
      userId: teachers.userDocs[index]._id,
      firstName: teachers.userDocs[index].info.firstName,
      lastName: teachers.userDocs[index].info.lastName,
      schoolId: teacher.schoolId,
      grade: student.info.grade,
    });
  });
  return ret;
}

function setSchoolCourses(courses) {
  let ret = [];
  courses.forEach((course) => {
    ret.push({
      courseId: course._id,
      subject: course.info.subject,
      description: course.info.description,
      schoolId: course.schoolId,
      url: course.connectURL,
    });
  });
  return ret;
}

function pushAutoCompleteUsers(schools) {
  let ret = [];
  schools.forEach((school) => {
    const text = school.info.name + " (" + school.info.grade + ")";
    const value = school._id;
    ret.push({ text: text, value: value });
  });

  return ret;
}

export default schoolReducer;
