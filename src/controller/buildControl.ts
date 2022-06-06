import { BuildInter } from "./../types/BuildInter";
import Router from "koa-router";
import {
  addBuild,
  deleteBuild,
  findBuildInfo,
  findBuildInfoForId,
  findBuildSingle,
  updateBuild,
} from "../model/buildModel";

/**
 * 获取栋数信息
 * @param ctx
 */
export async function getBuildInfo(ctx: Router.RouterContext) {
  // 获取参数
  const { code } = ctx.query as { code: string };

  try {
    await findBuildInfo(code).then((res) => {
      ctx.body = {
        code: 200,
        message: "数据获取成功",
        success: true,
        data: res,
      };
    });
  } catch {
    return (ctx.body = {
      code: 400,
      message: "查询失败，联系管理员",
      success: false,
      data: null,
    });
  }
}

/**
 * 添加栋数信息
 * @param ctx
 */
export async function addBuildInfo(ctx: Router.RouterContext) {
  // 获取参数
  console.log(ctx.request.body);
  const { community_code, name, house, desc } = ctx.request.body as BuildInter;
  try {
    await addBuild({ community_code, name, house, desc });
    ctx.body = {
      code: 200,
      success: true,
      message: "数据添加成功",
      data: null,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      success: false,
      message: "数据添加失败,联系管理员",
      data: null,
    };
  }
}

/**
 * 根据id获取指定小区的栋数信息
 * @param ctx
 */
export async function getBuildInfoOnId(ctx: Router.RouterContext) {
  const { id } = ctx.params as { id: number | unknown };
  try {
    await findBuildInfoForId(id as number).then((res) => {
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
      message: "数据获取失败,联系管理员",
      data: null,
    };
  }
}

/**
 * 更新栋数信息
 * @param ctx
 */
export async function updateBuildInfo(ctx: Router.RouterContext) {
  // 获取信息
  const { id, community_code, name, house, desc } = ctx.request
    .body as BuildInter;
  // 更新数据
  try {
    updateBuild({ id, community_code, name, house, desc });
    ctx.body = {
      code: 200,
      success: true,
      message: "数据更新成功",
      data: null,
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据更新失败,联系管理员",
      data: null,
    };
  }
}

/**
 * 删除栋数信息
 * @param ctx
 */
export async function deleteBuildInfo(ctx: Router.RouterContext) {
  console.log(ctx.request.body);
  const { id } = ctx.request.body as { id: number };
  console.log(id);
  // 删除栋数信息
  try {
    await deleteBuild(id).then((res) => {
      console.log(res);
    });
    ctx.body = {
      code: 200,
      success: true,
      message: "数据删除成功",
      data: null,
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      success: false,
      message: "数据删除失败,联系管理员",
      data: null,
    };
  }
}

/**
 * 获取栋数id,name,code
 * @param ctx
 */
export async function getBuildSingle(ctx: Router.RouterContext) {
  const { community_code } = ctx.query as { community_code: string };

  try {
    await findBuildSingle(community_code).then((res) => {
      ctx.body = {
        code: 200,
        message: "数据获取成功",
        success: true,
        data: res,
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      message: "数据获取失败,联系管理员",
      success: false,
      data: null,
    };
  }
}
