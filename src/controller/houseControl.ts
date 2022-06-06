import { HouseInter, HouseFilterInter } from "houseInter";
import Router from "koa-router";
import {
  findHouseFilterInfo,
  findHouseInfo,
  findHouseInfoWithId,
  findHouseList,
  insterHouseInfo,
  removeHouseById,
  updateHouseInfo,
} from "../model/houseModel";

/**
 * 获取房产信息
 * @param ctx
 */
export async function getHouseInfo(ctx: Router.RouterContext) {
  try {
    await findHouseInfo().then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        data: res,
        msg: "数据获取成功",
      };
    });
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      data: e,
      msg: "数据获取失败",
    };
  }
}

/**
 * 根据id获取房产信息
 * @param ctx
 */
export async function getHouseInfoById(ctx: Router.RouterContext) {
  // 获取id
  const { id } = ctx.query as { id: number | unknown };
  try {
    await findHouseInfoWithId(id as number).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        data: res[0],
        message: "数据获取成功",
      };
    });
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      data: e,
      message: "数据获取失败",
    };
  }
}

/**
 * 获取分类后的房产信息
 * @param ctx
 */
export async function getHouseFilterInfo(ctx: Router.RouterContext) {
  console.log(ctx.request.body);
  // 获取参数
  const { community_code, building_code, enter_time, owner_name, owner_tel } =
    ctx.request.body as HouseFilterInter;

  try {
    await findHouseFilterInfo({
      community_code,
      building_code,
      enter_time,
      owner_name,
      owner_tel,
    }).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        data: res,
        message: "数据获取成功",
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      data: error,
      message: "数据获取失败,联系管理员",
    };
  }
}

/**
 * 添加房产信息
 * @param ctx
 */
export async function addHouseInfo(ctx: Router.RouterContext) {
  // 获取参数
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
  } = ctx.request.body as HouseInter;

  try {
    await insterHouseInfo({
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
    }).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据添加成功",
        data: null,
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据获取失败,联系管理员",
      data: error,
    };
  }
}

/**
 * 更新房产信息
 * @param ctx
 */
export async function updateHouseInfoById(ctx: Router.RouterContext) {
  // 获取参数
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
  } = ctx.request.body as HouseInter;
  try {
    await updateHouseInfo({
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
    }).then((res) => {
      console.log(res);
      ctx.body = {
        code: 200,
        success: true,
        message: "数据更新成功",
        data: null,
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据获取失败,联系管理员",
      data: error,
    };
  }
}

/**
 * 删除房产信息
 */
export async function deleteHouseInfoById(ctx: Router.RouterContext) {
  // 获取id
  const { id } = ctx.request.body as { id: number | unknown };
  try {
    await removeHouseById(id as number);
    ctx.body = {
      code: 200,
      success: true,
      message: "数据删除成功",
      data: null,
    };
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据删除失败",
      data: e,
    };
  }
}

/**
 * 获取房产列表
 * @param ctx
 */
export async function getHouseList(ctx: Router.RouterContext) {
  const { community_code } = ctx.query as { community_code: string };
  try {
    await findHouseList(community_code).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        data: res,
        message: "数据获取成功",
      };
    });
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      data: e,
      message: "数据获取失败",
    };
  }
}
