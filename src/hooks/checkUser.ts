import * as Joi from "joi";
import { UserInter } from "../@types/userInter";

// 创建校验规则
const schema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(20)
    .required()
    .error(new Error("用户名格式错误")),
  password: Joi.string()
    .min(5)
    .max(20)
    .required()
    .error(new Error("密码格式错误")),
  email: Joi.string().email().required().error(new Error("邮箱格式错误")),
});

// 校验方法
export function checkUser(user: UserInter) {
  // 进行校验
  return schema.validate(user);
}

// 创建登录校验规则
const loginSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(20)
    .required()
    .error(new Error("用户名格式错误")),
  password: Joi.string()
    .min(5)
    .max(20)
    .required()
    .error(new Error("密码格式错误")),
});

// 登录校验方法
export function checkLogin(params: UserInter) {
  return loginSchema.validate(params);
}
