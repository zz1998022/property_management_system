import { BuildListInter } from "./../types/BuildInter";
import { HouseFilterInter } from "../types/houseInter";
import { HouseInter } from "houseInter";
import { DB } from "../config/mysql";

// 实例化DB
const db = new DB();

/**
 * 获取房产信息
 * @returns Promise<Array<houseInter>>
 */
export function findHouseInfo(): Promise<Array<HouseInter>> {
  const sql =
    "select house.id,comm.`name` as community_name,build.`name` as build_name,house.building_code,house.`code`,house.`name`,house.owner_name,house.owner_tel,house.rooms,house.unit,house.floor,house.`desc`,house.enter_time from smart_house as house,smart_building as build,smart_community as comm where build.community_code = house.community_code and comm.`code` = house.community_code GROUP BY house.id";

  return db.query(sql);
}

/**
 * 根据id获取房产信息
 * @param id
 * @returns
 */
export function findHouseInfoWithId(id: number): Promise<Array<HouseInter>> {
  return db.query(
    "select house.id,comm.`name` as community_name,build.`name` as build_name,house.building_code,build.community_code,house.`name`,house.owner_name,house.owner_tel,house.rooms,house.unit,house.floor,house.`desc`,house.enter_time from smart_house as house,smart_building as build,smart_community as comm where build.community_code = house.community_code and comm.`code` = house.community_code and house.id=? GROUP BY house.id",
    [id]
  );
}

/**
 * 获取筛选后的房产数据
 * @param parmas
 * @returns
 */
export function findHouseFilterInfo(parmas: HouseFilterInter) {
  // 处理sql
  const sql = `select house.id,comm.\`name\` as community_name,build.\`name\` as build_name,house.building_code,house.\`code\`,house.\`name\`,house.owner_name,house.owner_tel,house.rooms,house.unit,house.floor,house.\`desc\`,house.enter_time from smart_house as house,smart_building as build,smart_community as comm where build.community_code = house.community_code and comm.\`code\` = house.community_code ${
    parmas.owner_name ? `and owner_name = "${parmas.owner_name}"` : ""
  }
    ${parmas.owner_tel ? `and owner_tel = "${parmas.owner_tel}"` : ""}
    ${
      parmas.enter_time?.length > 0
        ? `and enter_time between "${parmas.enter_time[0]}" and "${parmas.enter_time[1]}"`
        : ""
    } and house.building_code = "${
    parmas.building_code
  }" and house.community_code = "${parmas.community_code}"
   GROUP BY house.id`;
  console.log(sql);

  return db.query(sql);
}

/**
 * 添加房产信息
 * @param params
 */
export function insterHouseInfo(params: HouseInter) {
  // 生成房产代码
  function generateCode(): string {
    return `HS${+new Date()}`;
  }

  const {
    community_code,
    building_code,
    name,
    owner_name,
    owner_tel,
    rooms,
    unit,
    floor,
    enter_time,
    desc,
  } = params;
  return db.query(
    "insert into smart_house(community_code,building_code,`code`,`name`,owner_name,owner_tel,rooms,unit,floor,`desc`,enter_time) values(?,?,?,?,?,?,?,?,?,?,?)",
    [
      community_code,
      building_code,
      generateCode(),
      name,
      owner_name,
      owner_tel,
      rooms,
      unit,
      floor,
      desc,
      enter_time,
    ]
  );
}

/**
 * 更新房产信息
 */
export function updateHouseInfo(params: HouseInter) {
  const {
    id,
    community_code,
    building_code,
    name,
    owner_name,
    owner_tel,
    rooms,
    unit,
    floor,
    enter_time,
    desc,
  } = params;
  return db.query(
    "update smart_house set community_code=?,building_code=?,`name`=?,owner_name=?,owner_tel=?,rooms=?,unit=?,floor=?,`desc`=?,enter_time=? where id=?",
    [
      community_code,
      building_code,
      name,
      owner_name,
      owner_tel,
      rooms,
      unit,
      floor,
      desc,
      enter_time,
      id,
    ]
  );
}

/**
 * 删除房产信息
 */
export function removeHouseById(id: number) {
  return db.query("delete from smart_house where id=?", [id]);
}

/**
 * 获取房产列表
 * @param community_code
 * @returns
 */
export function findHouseList(
  community_code: string
): Promise<Array<BuildListInter>> {
  return db.query(
    "select id,`code`,`name` from smart_house where community_code = ?",
    [community_code]
  );
}
