import * as Router from "koa-router";
import { DB } from "../config/mysql";
import * as jwt from "jwt-simple";
import { checkLogin, checkUser } from "../hooks/checkUser";
import { addUsers, findUsers } from "../model/usersModel";
import { hasUsers } from "../hooks/hasUsers";

const db = new DB();
//#region 登录
export async function usersLogin(ctx: Router.RouterContext) {
  // 获取账号密码
  const { username, password } = ctx.request.body;
  // 进行数据校验
  const result = await checkLogin(ctx.request.body);
  if (result.error) {
    return (ctx.body = {
      code: -1,
      msg: String(result.error),
    });
  }
  // 判断账号密码是否正确
  return findUsers(username).then((data) => {
    console.log(111);
    if (data.length === 0) {
      return (ctx.body = {
        code: -1,
        msg: "账号不存在",
      });
    }
    if (data[0].password !== password) {
      return (ctx.body = {
        code: -1,
        msg: "密码错误",
      });
    }
    // 生成token
    const token = jwt.encode(
      {
        username: data[0].username,
        password: data[0].password,
      },
      "secret"
    );
    ctx.body = {
      code: 200,
      msg: "登录成功",
      token: token,
    };
  });
}
//#endregion
//#region 注册
export async function userRegister(ctx: Router.RouterContext) {
  // 获取参数
  const { username, password, email } = ctx.request.body;
  // 对数据进行校验
  const result = await checkUser(ctx.request.body);
  // 判断用户是否存在
  const hasUser = await hasUsers(username);
  if (hasUser) {
    return (ctx.body = {
      code: -1,
      msg: "用户已存在",
    });
  }
  if (result.error) {
    return (ctx.body = {
      code: -1,
      msg: String(result.error),
      data: null,
      success: false,
    });
  }
  // 将数据添加到数据库
  await addUsers([username, password, email]).then(() => {
    ctx.body = {
      code: 200,
      msg: "用户注册成功",
      data: null,
      success: true,
    };
  });
}
//#endregion
