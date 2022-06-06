import { PeopleInter } from "./../types/PeopleInter";
import { RouterContext } from "koa-router";
import {
  findPeopleFilterInfo,
  findPeopleIdAndName,
  findPeopleInfoById,
  insertPeopleInfo,
  removePeopleInfoById,
  updatePeopleInfoById,
} from "../model/peopleModel";
import { PeopleFilterInter } from "../types/PeopleInter";

/**
 * 获取筛选后的人员信息
 * @param ctx
 */
export async function getFilterPeopleInfo(ctx: RouterContext) {
  try {
    const { community_code, house_code, birth } = ctx.request
      .body as PeopleFilterInter;
    const res = await findPeopleFilterInfo({
      community_code,
      house_code,
      birth,
    });
    ctx.body = {
      code: 200,
      success: true,
      data: res,
      message: "数据获取成功",
    };
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
 * 根据id获取人员信息
 * @param ctx
 */
export async function getPeopleInfoById(ctx: RouterContext) {
  const { id } = ctx.params as { id: number | unknown };
  try {
    await findPeopleInfoById(id as number).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: res[0],
      };
    });
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据获取失败",
      data: e,
    };
  }
}

/**
 * 更新人员信息
 * @param ctx
 */
export async function updatePeopleInfo(ctx: RouterContext) {
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
  } = ctx.request.body as PeopleInter;

  try {
    await updatePeopleInfoById({
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
    }).then((res) => {
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
      message: "数据更新失败",
      data: error,
    };
  }
}

/**
 * 添加人员信息
 * @param ctx
 */
export async function addPeopleInfo(ctx: RouterContext) {
  // 获取参数
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
  } = ctx.request.body as PeopleInter;

  try {
    await insertPeopleInfo({
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
    });
    ctx.body = {
      code: 200,
      success: true,
      message: "数据添加成功",
      data: null,
    };
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据添加失败",
      data: e,
    };
  }
}

/**
 * 删除人员信息
 * @param ctx
 */
export async function deletePeopleInfoById(ctx: RouterContext) {
  const { id } = ctx.request.body as { id: number };
  try {
    await removePeopleInfoById(id);
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
 * 获取人员id,name
 */
export async function getPeopleIdAndName(ctx: RouterContext) {
  // 获取参数
  const { community_code } = ctx.query as { community_code: string };

  try {
    await findPeopleIdAndName(community_code).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: res,
      };
    });
  } catch (e) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据获取失败",
      data: e,
    };
  }
}
