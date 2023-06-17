import { StudentProps } from "../../../type/Student/student.type";

export const SUBJECTS_HIGHER_CLASS = [
  "Tamil",
  "English",
  "Math",
  "Physics",
  "Chemistry",
];
export const SUBJECTS_MIDDLE_CLASS = [
  "Tamil",
  "English",
  "Math",
  "Science",
  "Social",
];

export const STU_INIT_STATE: StudentProps = {
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  class: "",
  subjects: [],
  profilePhoto: null,
};
