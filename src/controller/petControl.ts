import { PetAddInter } from "./../types/PetInter";
import { RouterContext } from "koa-router";
import {
  findPetInfo,
  findPetInfoById,
  insertPetInfo,
  removePetInfoById,
  updatePetInfoById,
} from "../model/petModel";

/**
 * 获取宠物信息
 */
export async function getPetInfo(ctx: RouterContext) {
  try {
    await findPetInfo().then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: res,
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据获取失败",
      data: error,
    };
  }
}

/**
 * 添加宠物信息
 * @param ctx
 */
export async function addPetInfo(ctx: RouterContext) {
  // 获取参数
  const { member_id, pet_name, color, photo, adopt_time, remark } = ctx.request
    .body as PetAddInter;

  try {
    await insertPetInfo({
      member_id,
      pet_name,
      color,
      photo,
      adopt_time,
      remark,
    }).then(() => {
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
      message: "数据添加失败",
      data: error,
    };
  }
}

/**
 * 根据id获取宠物信息
 * @param ctx
 */
export async function getPetInfoById(ctx: RouterContext) {
  // 获取id
  const { id } = ctx.query as { id: number | unknown };

  try {
    await findPetInfoById(id as number).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: res[0],
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据获取失败",
      data: error,
    };
  }
}

/**
 * 更新宠物信息
 */
export async function updatePetInfo(ctx: RouterContext) {
  // 获取参数
  const params = ctx.request.body as PetAddInter;
  try {
    await updatePetInfoById(params).then((res) => {
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
      data: null,
    };
  }
}

/**
 * 删除宠物信息
 */
export async function deletePetInfo(ctx: RouterContext) {
  const { id } = ctx.request.body as { id: number };

  try {
    await removePetInfoById(id).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据删除成功",
        data: null,
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据删除失败",
      data: null,
    };
  }
}
