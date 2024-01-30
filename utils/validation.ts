import joi from "joi"

let regex = /^(?!.*\s).{6,20}$/;

export const validAction = joi.object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().pattern(new RegExp(regex)).required(),
    confirm: joi.ref("password")
  });

export const validActionSign = joi.object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().pattern(new RegExp(regex)).required(),
  });
  
  export const validActionReset = joi.object({
    email: joi.string().email().trim().lowercase().required(),
  });
  
  export const validActionPass = joi.object({
    password: joi.string().pattern(new RegExp(regex)).required(),
  });
  