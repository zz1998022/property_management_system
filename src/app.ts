import * as Koa from "koa";
import * as Router from "koa-router";
import * as dotenv from "dotenv";
import * as path from "path";
import * as koaJwt from "koa-jwt";
import * as body from "koa-body";
import * as cors from "koa2-cors";
import * as KoaStatic from "koa-static";

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
// 小区路由
import communityRouter from "./router/communityRouter";
// 图片上传路由
import uploaderRouter from "./router/uploaderRouter";
// 栋数路由
import build from "./router/buildRouter";
// 房产路由
import house from "./router/houseRouter";
// 人员管理路由
import people from "./router/peopleRouter";
// 车辆管理路由
import vehicle from "./router/vehicleRouter";
// 宠物路由
import pet from "./router/petRouter";

const app = new Koa();
const router = new Router();

app.use(KoaStatic(__dirname + "/public"));
app.use(
  body({
    multipart: true,
    strict: false,
    formidable: {
      // 上传存放的路劲
      uploadDir: path.join(__dirname, "./public/uploads"),
      // 保持后缀名\
      keepExtensions: true,
    },
  })
);
app.use(cors());

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
app.use(communityRouter.routes());
app.use(uploaderRouter.routes());
app.use(build.routes());
app.use(house.routes());
app.use(people.routes());
app.use(vehicle.routes());
app.use(pet.routes());

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT;

app.listen(port || 3000);

console.log(`server running on port ${port}`);
