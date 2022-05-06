import { CommunityAll } from "./../@types/communityInter";
import { DB } from "../config/mysql";
import { communityDetail } from "../@types/communityInter";

// 实例化数据库类
const db = new DB();

// 获取小区名字
export function findCommunityName(): Promise<any> {
  return db.query("select id,`name`,code from smart_community");
}

// 获取小区详情
export function findCommunityDetail(code: string): Promise<[communityDetail]> {
  return db.query(`select (select count(*) from smart_building where community_code = '${code}') as build,
  (select count(*) from smart_member where community_code = '${code}') as people,
  (select count(*) from smart_member where community_code = '${code}' and owner_type = 3) as tenant;`);
}

// 获取所有小区列表
export function findCommunityAllList(): Promise<Array<CommunityAll>> {
  return db.query("select * from smart_community;");
}

// 添加小区
export function addCommunityList(params: CommunityAll) {
  // 结构出数据
  const {
    code,
    name,
    introduction,
    thumb,
    address,
    area,
    developer,
    estate,
    greening_rate,
    total_building,
    total_owner,
    create_time,
    update_time,
  } = params;
  const sql = `insert into smart_community(\`code\`,\`name\`,introduction,thumb,address,area,developer,estate,greening_rate,total_building,total_owner,create_time,update_time) VALUES('${code}','${name}','${
    introduction ? introduction : "暂无简介"
  }',${thumb},'${address}',${area},'${developer}','${estate}',${greening_rate},${total_building},${total_owner},${create_time},${
    update_time ? update_time : +new Date()
  });`;
  console.log(sql);
  return db.query(sql);
}
