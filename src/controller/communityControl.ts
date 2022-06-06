import Router from "koa-router";
import {
  findCommunityAllList,
  findCommunityDetail,
  findCommunityName,
  addCommunityList as addCommunityListModel,
  removeCommunityList,
  findCommunityOneList,
  findCommunitySmallList,
  updateCommunityOne,
} from "../model/communityModel";
import { CommunityAll } from "../types/communityInter";

export const getCommunityName = async (ctx: Router.RouterContext) => {
  // 获取小区信息接口
  await findCommunityName()
    .then((res) => {
      ctx.body = {
        code: 200,
        data: res,
        message: "数据获取成功",
        success: true,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        data: [],
        message: "查询出错，联系管理员",
        success: false,
      };
    });
};

// 获取小区详情信息
export const getCommunityDetail = async (ctx: Router.RouterContext) => {
  // 获取参数
  const { code } = ctx.params as { code: string };
  // 获取小区详情信息
  await findCommunityDetail(code)
    .then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        data: res[0],
        message: "数据获取成功",
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        success: false,
        data: [],
        message: "查询出错，联系管理员",
      };
    });
};

// 获取小区列表
export const getCommunityList = async (ctx: Router.RouterContext) => {
  // 获取小区列表
  await findCommunityAllList()
    .then((result) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: result,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        success: false,
        message: "数据获取失败，联系管理员",
        data: null,
      };
    });
};

// 获取精简小区列表
export const getCommunitySmallList = async (ctx: Router.RouterContext) => {
  try {
    const res = await findCommunitySmallList();
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      success: true,
      data: res,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: "服务器内部错误",
      success: false,
      data: null,
    };
  }
};

// 获取单个小区
export const getCommunityOneList = async (ctx: Router.RouterContext) => {
  // 获取参数
  const { id } = ctx.params as { id: number | unknown };
  // 获取单个小区
  await findCommunityOneList(id as number)
    .then((res) => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据获取成功",
        data: res[0],
      };
    })
    .catch(() => {
      ctx.body = {
        code: 400,
        message: "数据获取失败，联系管理员",
        success: false,
        data: null,
      };
    });
};

// 更新单个小区
export const updateCommunityList = async (ctx: Router.RouterContext) => {
  const params = ctx.request.body as CommunityAll;
  console.log(params.id);
  await updateCommunityOne(params)
    .then(() => {
      ctx.body = {
        code: 200,
        success: true,
        message: "数据更新成功",
        data: null,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        success: false,
        message: "数据更新失败，联系管理员",
        data: null,
      };
    });
};

// 添加小区
export const addCommunityList = async (ctx: Router.RouterContext) => {
  let params: CommunityAll = {
    name: null,
    introduction: null,
    thumb: null,
    address: null,
    area: null,
    developer: null,
    estate: null,
    greening_rate: null,
    total_building: null,
    total_owner: null,
    update_time: null,
  };
  // 合并对象
  params = { ...params, ...ctx.request.body };
  const forgetParams: Array<string> = ["introduction", "thumb", "update_time"];
  let flag = false;
  // 遍历对象
  for (const k in params) {
    console.log(params[k]);
    // 判断是否缺少参数
    if (params[k] === null && !forgetParams.includes(k)) {
      flag = true;
    }
  }
  // 判断是否缺少参数
  if (flag) {
    ctx.body = {
      code: 400,
      message: "缺少参数,请检查",
      data: null,
    };
  } else {
    await addCommunityListModel({ ...params })
      .then(() => {
        // 响应
        ctx.body = {
          code: 200,
          message: "添加成功",
          data: null,
        };
      })
      .catch((err) => {
        ctx.body = {
          code: 400,
          message: err,
          data: null,
        };
      });
  }
};

// 删除小区
export const deleteCommunityList = async (ctx: Router.RouterContext) => {
  // 获取参数
  const params = ctx.request.body as Array<number>;
  // 进行删除操作
  await removeCommunityList(params)
    .then((res) => {
      ctx.body = {
        code: 200,
        message: "数据删除成功",
        data: null,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        message: "数据删除失败",
        data: null,
      };
    });
};
