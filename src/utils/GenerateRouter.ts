import * as Router from "koa-router";

export const GenerateRouter = function (prefix?: string) {
  // 初始化Router
  const router = new Router();
  if (prefix) {
    router.prefix(prefix);
  }

  return { router };
};
