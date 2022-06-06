import { RouterContext } from "koa-router";
import { Vehicle } from "VehicleInter";
import {
  addVehicle,
  findVehicleInfo,
  findVehicleInfoById,
  removeVehicleById,
  updateVehicleById,
} from "../model/vehicleModel";
/**
 * 获取车辆信息
 */
export async function getVehicleInfo(ctx: RouterContext) {
  try {
    await findVehicleInfo().then((res) => {
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
 * 根据id获取车辆信息
 * @param ctx
 */
export async function getVehicleInfoById(ctx: RouterContext) {
  try {
    const { id } = ctx.query as { id: number | unknown };
    await findVehicleInfoById(id as number).then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: res[0] ? res[0] : [],
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
 * 添加车辆信息
 */
export async function addVehicleInfo(ctx: RouterContext) {
  // 获取参数
  const { member_id, name, license_plate, color, photo, remark } = ctx.request
    .body as Vehicle;
  try {
    await addVehicle({
      member_id,
      name,
      license_plate,
      color,
      photo,
      remark,
    }).then((res) => {
      console.log(res);
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
      sucess: false,
      message: "数据添加失败",
      data: error,
    };
  }
}

/**
 * 更新车辆信息
 * @param ctx
 */
export async function updateVehicleInfo(ctx: RouterContext) {
  // 获取参数
  const { id, name, member_id, license_plate, color, photo, remark } = ctx
    .request.body as Vehicle;
  try {
    await updateVehicleById({
      id,
      name,
      member_id,
      license_plate,
      color,
      photo,
      remark,
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
      sucess: false,
      message: "数据更新失败",
      data: error,
    };
  }
}

/**
 * 根据id删除车辆信息
 * @param ctx
 */
export async function deleteVehicleInfo(ctx: RouterContext) {
  // 获取参数
  const { id } = ctx.request.body as { id: number };
  try {
    await removeVehicleById(id).then(() => {
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
      sucess: false,
      message: "数据删除失败",
      data: error,
    };
  }
}
