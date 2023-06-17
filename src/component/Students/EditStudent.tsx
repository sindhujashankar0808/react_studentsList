import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/helpers/common.helpers";
import { STU_LOCAL_STORAGE_KEY } from "../../utils/constant/common.constant";

import {
  STU_INIT_STATE,
  SUBJECTS_HIGHER_CLASS,
  SUBJECTS_MIDDLE_CLASS,
} from "../../utils/constant/students/students.constants";
import { StudentProps } from "../../type/Student/student.type";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentStu, setCurrentStu] = useState<StudentProps | null>(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState<string[]>([]);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  useEffect(() => {
    const studentsList: StudentProps[] | null = getLocalStorage(
      STU_LOCAL_STORAGE_KEY
    );
    if (studentsList && id) {
      const filteredStu = studentsList.filter(
        (student) => student.id === Number(id)
      );
      if (filteredStu.length > 0) {
        setCurrentStu(filteredStu[0]);
        setSelectedSubGroup(
          filteredStu[0].class === "12"
            ? SUBJECTS_HIGHER_CLASS
            : SUBJECTS_MIDDLE_CLASS
        );
        setProfilePhotoFile(filteredStu[0].profilePhoto);
      }
    }
  }, [id]);

  const handleFileChange = (file?: File) => {
    if (file) {
      const selectedImage = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        const profileImage = event.target?.result;
        setCurrentStu((prevStu: any) => ({
          ...prevStu,
          profilePhoto: {
            name: selectedImage.name,
            dataUrl: profileImage,
          },
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      handleFileChange(file);
    } else if (
      type === "checkbox" &&
      event.target instanceof HTMLInputElement
    ) {
      const checked = event.target.checked;
      const selectedSubjects = [...currentStu!.subjects];

      if (checked) {
        selectedSubjects.push(value);
      } else {
        const index = selectedSubjects.indexOf(value);
        if (index !== -1) {
          selectedSubjects.splice(index, 1);
        }
      }

      setCurrentStu((prevStu: any) => ({
        ...prevStu,
        subjects: selectedSubjects,
      }));
    } else if (name === "class") {
      const selectedClass = value;
      let defaultSubjects: React.SetStateAction<string[]> = [];

      if (selectedClass === "11" || selectedClass === "12") {
        defaultSubjects = SUBJECTS_HIGHER_CLASS;
      } else {
        defaultSubjects = SUBJECTS_MIDDLE_CLASS;
      }

      setSelectedSubGroup(defaultSubjects);

      setCurrentStu((prevStu: any) => ({
        ...prevStu,
        [name]: value,
        subjects: defaultSubjects,
      }));
    } else {
      setCurrentStu((prevStu: any) => ({
        ...prevStu,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    const students = getLocalStorage(STU_LOCAL_STORAGE_KEY);
    if (students) {
      const updatedStudents = [...students];
      const studentIndex = updatedStudents.findIndex(
        (student) => student.id === Number(id)
      );
      if (studentIndex !== -1) {
        updatedStudents[studentIndex] = {
          ...currentStu,
          profilePhotoFile: profilePhotoFile,
        };
        setLocalStorage(STU_LOCAL_STORAGE_KEY, updatedStudents);
        navigate("/");
      }
    }
  };

  if (!currentStu) {
    return <p></p>;
  }

  const resetForm = () => {
    setCurrentStu({ ...STU_INIT_STATE });
  };

  return (
    <div>
      <form className="form-color">
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
            value={currentStu.firstName}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="lastName">Last Name: &nbsp;&nbsp;</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={currentStu.lastName}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email: &nbsp;&nbsp;</label>
          <input
            type="email"
            id="email"
            name="email"
            value={currentStu.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="age">Age: &nbsp;&nbsp;</label>
          <input
            type="number"
            id="age"
            name="age"
            value={currentStu.age}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="class">Class:&nbsp;&nbsp;</label>
          <select
            id="class"
            name="class"
            value={currentStu.class}
            onChange={handleInputChange}
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
        {selectedSubGroup.length > 0 ? (
          <>
            {selectedSubGroup.map((subject) => (
              <div key={subject}>
                <label>
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject}
                    checked={currentStu.subjects.includes(subject)}
                    onChange={handleInputChange}
                  />
                  {subject}
                </label>
              </div>
            ))}
          </>
        ) : null}
        <div>
          <label htmlFor="profilePhoto">Profile Photo: &nbsp;&nbsp;</label>
          <input type="file" name="profilePhoto" onChange={handleInputChange} />
          {currentStu.profilePhoto && (
            <div>Selected file: {currentStu.profilePhoto?.name}</div>
          )}
        </div>
        <br />
        <button type="submit" onClick={handleUpdate}>
          Update
        </button>
        &nbsp;&nbsp;
        <button onClick={resetForm}>Reset</button>
      </form>
    </div>
  );
};

export default EditStudent;
