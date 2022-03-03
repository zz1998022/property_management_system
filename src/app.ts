import * as Koa from "koa";
import * as Router from "koa-router";
import * as dotenv from "dotenv";
import * as path from "path";
import * as koaJwt from "koa-jwt";
import * as bodyParser from "koa-bodyparser";

// 配置环境变量
dotenv.config({
  path: path.join(__dirname, "../.env"),
});
// jwt密钥
const secret = process.env.JWT_SECRET;
// token有效时间
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7;

// 用户路由
import usersRouter from "./router/usersRouter";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
// 进行拦截
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});
app.use(
  koaJwt({ secret }).unless({
    path: [/^\/users\/login/, /^\/users\/register/],
  })
);
// 挂载路由
app.use(usersRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log("server running on port 3000");
