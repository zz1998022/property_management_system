import { findUsers } from "../model/usersModel";

// 判断用户是否存在
export async function hasUsers(username: string) {
  const result = await findUsers(username);
  return result.length > 0;
}
