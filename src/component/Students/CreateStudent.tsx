import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  validateForm,
} from "../../utils/helpers/common.helpers";
import { STU_LOCAL_STORAGE_KEY } from "../../utils/constant/common.constant";
import { useNavigate } from "react-router-dom";
import "../../style/style.css";
import {
  STU_INIT_STATE,
  SUBJECTS_HIGHER_CLASS,
  SUBJECTS_MIDDLE_CLASS,
} from "../../utils/constant/students/students.constants";
import { StudentProps } from "../../type/Student/student.type";
import { ROUTERS } from "../../utils/constant/router.constant";

export const CreateStudent = () => {
  const navigate = useNavigate();
  const students = getLocalStorage(STU_LOCAL_STORAGE_KEY);
  const [selSubGroup, setSelSubGroup] = useState<string[]>([]);
  const [formData, setFormData] = useState<StudentProps>({
    ...STU_INIT_STATE,
    id: students !== null ? students.length + 1 : 1,
  });
  const [studentList, setStudentList] = useState<StudentProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const students = getLocalStorage(STU_LOCAL_STORAGE_KEY);
    if (students) {
      setStudentList(students);
    }
  }, []);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (name === "age") {
      let ageValue = parseInt(value, 10);
      ageValue = Math.max(3, Math.min(ageValue, 20)); // Limit the age between 3 and 20
      setFormData({ ...formData, [name]: ageValue });
    } else if (type === "checkbox") {
      let updatedSubjects: string[];
      if (checked) {
        updatedSubjects = [...formData.subjects, value];
      } else {
        updatedSubjects = formData.subjects.filter(
          (subject) => subject !== value
        );
      }
      setFormData({ ...formData, subjects: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const subGroup =
      value === "11" || value === "12"
        ? SUBJECTS_HIGHER_CLASS
        : SUBJECTS_MIDDLE_CLASS;
    setFormData({ ...formData, [name]: value, subjects: subGroup });
    setSelSubGroup(subGroup);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const profileImage = event.target?.result;
        setFormData({
          ...formData,
          profilePhoto: {
            name: selectedImage.name,
            dataUrl: profileImage,
          },
        });
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateForm(formData);
    setTimeout(() => {
      try {
        const updatedFormDataArray = [formData, ...studentList];
        setLocalStorage(STU_LOCAL_STORAGE_KEY, updatedFormDataArray);
        setStudentList(updatedFormDataArray);
        navigate(ROUTERS.home);
      } catch (error: unknown) {
        console.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };
  const resetForm = () => {
    setFormData({ ...STU_INIT_STATE });
  };
  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-color">
          <div style={{ textAlign: "center" }}>
            <h2>Student Form</h2>
          </div>
          <br />
          <div>
            <label htmlFor="firstName">First Name: &nbsp; </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="lastName">Last Name: &nbsp;&nbsp;</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email: &nbsp;&nbsp;</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="age">Age: &nbsp;&nbsp;</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="class">Class:&nbsp;&nbsp;</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleClassChange}
            >
              <option value="">--Select Class--</option>
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={String(index + 1)}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <br />
          {selSubGroup.length > 0 ? (
            <>
              {selSubGroup.map((subject) => (
                <div key={subject}>
                  <label>
                    <input
                      type="checkbox"
                      name="subjects"
                      value={subject}
                      checked={formData.subjects.includes(subject)}
                      onChange={handleChange}
                    />
                    {subject}
                  </label>
                </div>
              ))}
            </>
          ) : null}
          <div>
            <label htmlFor="profilePhoto">Profile Photo: &nbsp;&nbsp;</label>
            <input
              type="file"
              name="profilePhoto"
              onChange={handleFileChange}
            />
          </div>
          <br />
          <button type="submit">Submit</button> &nbsp;&nbsp;
          <button type="button" onClick={resetForm}>
            Reset
          </button>
        </form>
      )}
    </div>
  );
};
