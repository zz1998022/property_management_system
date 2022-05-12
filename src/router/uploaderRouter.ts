import { GenerateRouter } from "../utils/GenerateRouter";
import * as path from "path";
import { uploaderImage } from "../controller/uploaderControl";

const { router } = GenerateRouter();

// 上传图片
router.post("/image", uploaderImage);

export default router;
