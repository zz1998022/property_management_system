import Router from "koa-router";
import { findCommunityName } from "../model/communityModel";

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
