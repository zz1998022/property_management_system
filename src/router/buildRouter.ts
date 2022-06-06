import {
  getBuildInfo,
  addBuildInfo,
  getBuildInfoOnId,
  updateBuildInfo,
  deleteBuildInfo,
  getBuildSingle,
} from "../controller/buildControl";
import { GenerateRouter } from "../utils/GenerateRouter";

const { router } = GenerateRouter("/build");

// 获取栋数信息
router.get("/", getBuildInfo);
// 添加栋数
router.put("/", addBuildInfo);
// 更新栋数信息
router.post("/", updateBuildInfo);
// 获取栋数所在的小区信息
router.get("/:id", getBuildInfoOnId);
// 删除栋数信息
router.delete("/", deleteBuildInfo);
// 获取栋数id,name,code
router.get("/list/single", getBuildSingle);

export default router;
