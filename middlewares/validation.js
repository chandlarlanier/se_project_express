const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field is required",
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The imageUrl field is required",
      "string.uri": "the imageUrl field must be a valid url",
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The name field is required",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": "The avatar field must be a valid URL",
      "string.empty": "The avatar field is required",
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.email": "The email field must be a valid email",
      "string.empty": "The email field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required",
    }),
  }),
});

const validateLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custome(validateEmail).messages({
      "string.email": "The email field must be a valid email",
      "string.empty": "The email field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required",
    }),
  }),
});

const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": "Id does not use hexadecimal values",
      "string.length": "Id length is not equal to 24",
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserInfo,
  validateLogIn,
  validateId,
};
