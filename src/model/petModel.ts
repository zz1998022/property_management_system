import { PetAddInter, PetSingleInter } from "./../types/PetInter";
import { DB } from "../config/mysql";
import * as dayjs from "dayjs";

const db = new DB();

/**
 * 查询宠物信息
 */
export function findPetInfo() {
  return db.query(
    "select  p.id,m.`name` as member_name,p.`name` as pet_name,p.color,p.photo,p.adopt_time,p.create_time,p.update_time,p.remark from smart_pet as p,smart_member as m where p.member_id = m.id;"
  );
}

/**
 * 添加宠物信息
 */
export function insertPetInfo(params: PetAddInter) {
  // 获取参数
  const { member_id, pet_name, color, photo, adopt_time, remark } = params;

  return db.query(
    "insert into smart_pet(member_id,`name`,color,photo,adopt_time,create_time,update_time,remark) values(?,?,?,?,?,?,?,?)",
    [
      member_id,
      pet_name,
      color,
      photo,
      adopt_time,
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      remark,
    ]
  );
}

/**
 * 根据id查询宠物信息
 * @param id 宠物id
 * @returns
 */
export function findPetInfoById(id: number): Promise<Array<PetSingleInter>> {
  return db.query(
    "select p.id,comm.code,m.id as member_id,p.`name` as pet_name,p.color,p.photo,p.adopt_time,p.remark from smart_community as comm,smart_member as m,smart_pet as p where comm.`code` = m.community_code and p.member_id = m.id and p.id = ?;",
    [id]
  );
}

/**
 * 根据id更新宠物信息
 * @param params
 * @returns
 */
export function updatePetInfoById(params: PetAddInter) {
  return db.query(
    "update smart_pet set member_id = ?,`name` = ?,color = ?,photo = ?,adopt_time = ?,update_time = ?, remark = ? where id = ?;",
    [
      params["member_id"],
      params["pet_name"],
      params["color"],
      params["photo"],
      params["adopt_time"],
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      params["remark"],
      params["id"],
    ]
  );
}

/**
 * 根据id删除宠物信息
 */
export function removePetInfoById(id: number) {
  return db.query("delete from smart_pet where id = ?", [id]);
}
