import { PeopleInter } from "./../types/PeopleInter";
import { PeopleFilterInter } from "PeopleInter";
import { DB } from "../config/mysql";
import * as dayjs from "dayjs";

const db = new DB();

/**
 * 查询筛选后的人员信息
 * @param params
 * @returns
 */
export async function findPeopleFilterInfo(
  params: PeopleFilterInter
): Promise<Array<PeopleInter>> {
  // 结构出参数
  const { community_code, house_code, birth } = params;

  // 拼接sql语句
  const sql = `select member.id,member.photo,community.\`name\`,house.\`name\` as house_name,member.\`name\` as member_name,member.identity_id,member.tel,member.occupation,member.birth,member.gender,member.owner_type,member.remark,member.create_time,member.update_time from smart_member as member,smart_community as community,smart_house as house where member.community_code = community.\`code\` and member.house_code = house.\`code\` ${
    community_code ? `and member.community_code = "${community_code}"` : ""
  }
  ${house_code ? `and member.house_code = "${house_code}"` : ""}
  ${birth ? `and (member.birth between ${birth[0]} and ${birth[1]})` : ""};`;

  // 执行sql
  return db.query(sql);
}

/**
 * 根据id查询人员信息
 * @param id
 * @returns
 */
export async function findPeopleInfoById(
  id: number
): Promise<Array<PeopleInter>> {
  return db.query(`select * from smart_member where id = ?`, [id]);
}

/**
 * 根据id更新人员信息
 * @param params
 */
export async function updatePeopleInfoById(params: PeopleInter) {
  // 获取参数
  const {
    id,
    community_code,
    house_code,
    name,
    identity_id,
    tel,
    occupation,
    birth,
    gender,
    owner_type,
    remark,
    photo,
  } = params;

  return db.query(
    "update smart_member set community_code=?,house_code=?,`name`=?,identity_id=?,tel=?,occupation=?,birth=?,gender=?,owner_type=?,update_time=?,remark=?,photo=? where id = ?",
    [
      community_code,
      house_code,
      name,
      identity_id,
      tel,
      occupation,
      birth,
      gender,
      owner_type,
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      remark,
      photo,
      id,
    ]
  );
}

/**
 * 添加人员信息
 * @param params
 * @returns
 */
export async function insertPeopleInfo(params: PeopleInter) {
  const {
    community_code,
    house_code,
    name,
    identity_id,
    tel,
    occupation,
    birth,
    gender,
    owner_type,
    remark,
    photo,
  } = params;
  return db.query(
    "insert into smart_member(community_code,house_code,`name`,identity_id,tel,occupation,birth,gender,owner_type,create_time,update_time,remark,photo) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      community_code,
      house_code,
      name,
      identity_id,
      tel,
      occupation,
      birth,
      gender,
      owner_type,
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      remark,
      photo,
    ]
  );
}

/**
 * 根据id删除个人信息
 * @param id
 * @returns
 */
export async function removePeopleInfoById(id: number) {
  return db.query("delete from smart_member where id = ?", [id]);
}

/**
 * 获取人员 id name
 */
export async function findPeopleIdAndName(
  community_code: string
): Promise<Array<{ id: number; name: string }>> {
  return db.query(
    "select id,`name` from smart_member where community_code = ?",
    [community_code]
  );
}
