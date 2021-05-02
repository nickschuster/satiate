/* eslint no-useless-escape: 0 */
import Joi from "joi";

// Form schema.
export const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `An email is required.`,
      "string.email": `Email must be a valid email.`,
    }),
  name: Joi.string().min(2).max(32).messages({
    "string.empty": `A name is required.`,
    "string.min": `Name must be {#limit} characters or longer.`,
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/
    )
    .messages({
      "string.empty": `A password is required.`,
      "string.min": `Password must be {#limit} characters or longer.`,
      "string.pattern.base":
        "Password must contain at least one number, one lower and one uppercase letter, and one special character.",
    }),
});

// Validate a form field and update if there are errors.
export const validate = (type, value, setErrorState) => {
  const result = schema.validate({
    [type]: value,
  });

  setErrorState((prev) => {
    prev[type] = result.error ? result.error.message : "";
    return { ...prev };
  });
};

// Validate all form fields in a given form.
export const validateAll = (fields, values, setErrorState) => {
  for (const field in fields) {
    validate(field, values[field], setErrorState);
  }
};

// Determine if the given form contains any errors.
export const formIsValid = (errors) => {
  for (const error in errors) {
    if (errors[error] !== "") return false;
  }
  return true;
};
