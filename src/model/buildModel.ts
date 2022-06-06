import { DB } from "../config/mysql";
import { BuildInter } from "../types/BuildInter";
import * as dayjs from "dayjs";

const db = new DB();

// 查找栋数信息
export function findBuildInfo(code: string): Promise<Array<BuildInter>> {
  const sql = code
    ? `SELECT build.id,comm.\`name\`,build.community_code,build.code,build.\`name\` as build_name,build.house,build.\`desc\`,build.create_time FROM \`smart_building\` as build,smart_community as comm where build.community_code = "${code}" and build.community_code = comm.\`code\`; 
`
    : `SELECT build.id,comm.\`name\`,build.community_code,build.code,build.\`name\` as build_name,build.house,build.\`desc\`,build.create_time FROM \`smart_building\` as build,smart_community as comm where build.community_code = comm.\`code\`;`;

  return db.query(sql);
}

// 根据id查找栋数的信息
export function findBuildInfoForId(id: number) {
  return db.query("select * from smart_building where id = ?", [id]);
}

// 添加栋数
export function addBuild(params: BuildInter) {
  const { community_code, name, house, desc } = params;
  // 生成code
  const code = `BD${+new Date()}`;
  return db.query(
    "insert into smart_building(community_code,`code`,`name`,house,`desc`,create_time,update_time) values(?,?,?,?,?,?,?)",
    [
      community_code,
      code,
      name,
      house,
      desc ? desc : "",
      dayjs().format("YYYY-MM-DD HH:mm:ss"),
      dayjs().format("YYYY-MM-DD HH:mm:ss"),
    ]
  );
}

// 更新栋数信息
export function updateBuild(params: BuildInter) {
  const { id, name, house, desc } = params;
  return db.query(
    "update smart_building set `name`=?,house=?,`desc`=?,update_time=? where id=?",
    [name, house, desc, dayjs().format("YYYY-MM-DD HH:mm:ss"), id]
  );
}

// 删除栋数信息
export function deleteBuild(id: number) {
  return db.query("delete from smart_building where id=?", [id]);
}

/**
 * 获取栋数id,code,name
 * @returns
 */
export function findBuildSingle(community_code: string) {
  return db.query(
    "select id,`code`,`name` from smart_building where community_code = ?",
    [community_code]
  );
}
