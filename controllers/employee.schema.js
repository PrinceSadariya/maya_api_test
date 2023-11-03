const Joi = require("joi");

// validation for insert a new employe
module.exports.registerEmployee = (req, res, next) => {
  const schema = Joi.object({
    emp_firstname: Joi.string().required(),
    emp_lastname: Joi.string().required(),
    emp_email: Joi.string().email().required(),
    emp_mobile: Joi.string().alphanum().required(),
    emp_salary: Joi.number().required(),
    emp_designation: Joi.string().required(),
    emp_address: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
  return next();
};

// validation for update a employee
module.exports.updateEmployee = (req, res, next) => {
  const schema = Joi.object({
    emp_firstname: Joi.string(),
    emp_lastname: Joi.string(),
    emp_email: Joi.string().email(),
    emp_mobile: Joi.string().alphanum(),
    emp_salary: Joi.number(),
    emp_designation: Joi.string(),
    emp_address: Joi.string(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
  return next();
};
