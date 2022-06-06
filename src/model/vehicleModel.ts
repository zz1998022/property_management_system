import { Vehicle, VehicleInter } from "../types/VehicleInter";
import { DB } from "../config/mysql";
import * as dayjs from "dayjs";

const db = new DB();

/**
 * 查询车辆信息
 * @returns {Promise<any>}
 */
export function findVehicleInfo() {
  return db.query(
    "select v.id,m.`name` as 'member_name',v.`name`,v.license_plate,v.color,v.photo,v.create_time,v.remark  from smart_vehicle as v,smart_member as m where v.member_id = m.id;"
  );
}

/**
 * 根据id查询车辆信息
 * @param id 车辆id
 * @returns
 */
export function findVehicleInfoById(id: number): Promise<Array<VehicleInter>> {
  return db.query(
    "select v.id,m.community_code,m.id as member_id,m.`name` as 'member_name',v.`name`,v.license_plate,v.color,v.photo,v.create_time,v.remark  from smart_vehicle as v,smart_member as m where v.member_id = m.id and v.id = ?;",
    [id]
  );
}

/**
 * 添加车辆信息
 */
export function addVehicle(data: Vehicle) {
  return db.query(
    "insert into smart_vehicle(member_id,`name`,license_plate,color,photo,create_time,update_time,remark) VALUES(?,?,?,?,?,?,?,?)",
    [
      data.member_id,
      data.name,
      data.license_plate,
      data.color,
      data.photo,
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      data.remark,
    ]
  );
}

/**
 * 更新车辆信息
 * @param data
 * @returns
 */
export function updateVehicleById(data: Vehicle) {
  return db.query(
    "update smart_vehicle set `name` = ?,member_id = ?,license_plate = ?,color = ?,photo = ?,update_time = ?,remark = ? where id = ?",
    [
      data["name"],
      data["member_id"],
      data["license_plate"],
      data["color"],
      data["photo"],
      dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
      data["remark"],
      data["id"],
    ]
  );
}

/**
 * 根据id删除车辆信息
 * @param id
 * @returns
 */
export function removeVehicleById(id: number) {
  return db.query("delete from smart_vehicle where id = ?", [id]);
}
