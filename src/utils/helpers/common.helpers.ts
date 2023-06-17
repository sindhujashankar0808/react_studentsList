export let isLoading = false;
export const getLocalStorage = (key: string): any => {
  try {
    isLoading = true;
    const lsData = localStorage.getItem(key);
    if (lsData) {
      return JSON.parse(lsData);
    }
    isLoading = false;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setLocalStorage = (key: string, value: any): void => {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.log("Error Set localstorge", error);
  }
};

export const validateForm = (formData: any): boolean => {
  const requiredFields = ["firstName", "lastName", "email", "age", "class"];
  const minimumSubjectCount = 3;

  for (const field of requiredFields) {
    if (!formData[field]) {
      alert(`Missing field: ${field}`);
      return false;
    }
  }

  if (formData.subjects.length < minimumSubjectCount) {
    alert("Minimum subject count not met");
    return false; // Abort submission if minimum subject count is not met
  }

  return true; // Validation successful
};
