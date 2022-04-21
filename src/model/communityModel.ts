import { DB } from "../config/mysql";

// 实例化数据库类
const db = new DB();

// 获取小区名字
export function findCommunityName(): Promise<any> {
  return db.query("select id,`name` from smart_community");
}
