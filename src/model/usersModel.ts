// 添加用户
import { UserInter } from "../@types/userInter";
import { DB } from "../config/mysql";

// 实例化数据库类
const db = new DB();

// 注册用户
export function addUsers(user: Array<UserInter>) {
  // 遍历参数
  console.log(user);
  // 执行查询
  return db.query(
    "insert into smart_users(username,`password`,email) values(?,?,?)",
    user
  );
}
// 查找用户
export function findUsers(username: string) {
  return db.query("select * from smart_users where username=?", [username]);
}
