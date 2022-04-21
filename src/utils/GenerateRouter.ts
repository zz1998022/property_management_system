import * as Router from "koa-router";

/**
 * 生成路由对象
 * @param prefix 路由前缀
 * @constructor
 */
export const GenerateRouter = function (prefix?: string) {
  // 初始化Router
  const router = new Router();
  if (prefix) {
    router.prefix(prefix);
  }

  return { router };
};
