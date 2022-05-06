import * as Router from "koa-router";
import { put } from "../hooks/uploadFiles";
import * as fs from "fs";

export async function uploaderImage(ctx: Router.RouterContext) {
  // 判断图片是否上传成功
  if (JSON.stringify(ctx.request.files) === "{}") {
    return (ctx.body = {
      code: 400,
      success: false,
      message: "图片上传失败，联系管理员",
      data: null,
    });
  } else {
    // 将图片上传到oss
    const image: any = ctx.request.files.image;
    await put(image.filepath, `${+new Date()}`)
      .then(async ({ url }) => {
        // 删除本地的文件
        await fs.promises.unlink(image.filepath);
        ctx.body = {
          code: 200,
          success: true,
          message: "图片上传成功",
          data: url,
        };
      })
      .catch((err) => {
        ctx.body = {
          code: 400,
          success: false,
          message: "图片上传失败",
          data: err,
        };
      });
  }
  // 获取上传的文件
}
