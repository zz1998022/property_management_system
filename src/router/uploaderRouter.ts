import { GenerateRouter } from "../utils/GenerateRouter";
import * as multer from "multer";
import * as path from "path";
import { uploaderImage } from "../controller/uploaderControl";
import * as koaBody from "koa-body";

const { router } = GenerateRouter();
const upload = multer({ dest: path.join(__dirname, "../public/uploads") });

// 上传图片
router.post(
  "/image",
  koaBody({
    // 启用文件传输
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, "./public/uploads"),
      // 保留扩展名
      keepExtensions: true,
    },
  }),
  uploaderImage
);

export default router;
