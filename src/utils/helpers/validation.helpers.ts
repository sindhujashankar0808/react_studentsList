export const validateForm = (
  formData: any
): { isValid: boolean; errors: { [key: string]: string } } => {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "class",
    "profilePhoto",
  ];
  const minimumSubjectCount = 3;
  const specialCharactersRegex = /^[a-zA-Z ]*$/;

  const validationErrors: { [key: string]: string } = {};

  for (const field of requiredFields) {
    if (!formData[field]) {
      validationErrors[field] = `Missing field: ${field}`;
    }
  }

  if (formData.subjects.length < minimumSubjectCount) {
    validationErrors.subjects = "Minimum subject count not met";
  }

  if (!specialCharactersRegex.test(formData.firstName)) {
    validationErrors.firstName = "Invalid characters in the First Name field";
  }

  if (!specialCharactersRegex.test(formData.lastName)) {
    validationErrors.lastName = "Invalid characters in the Last Name field";
  }

  return {
    isValid: Object.keys(validationErrors).length === 0,
    errors: validationErrors,
  };
};
