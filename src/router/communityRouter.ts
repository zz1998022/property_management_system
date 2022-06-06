import {
  deleteCommunityList,
  getCommunityList,
} from "./../controller/communityControl";
import { GenerateRouter } from "../utils/GenerateRouter";
import {
  getCommunityName,
  getCommunityDetail,
  addCommunityList,
  getCommunityOneList,
  getCommunitySmallList,
  updateCommunityList,
} from "../controller/communityControl";

const { router } = GenerateRouter("/community");

// 获取所有小区的名字
router.get("/name", getCommunityName);
// 获取小区的详情信息
router.post("/detail/:code", getCommunityDetail);
// 获取小区列表
router.get("/list", getCommunityList);
// 获取小区精简列表
router.get("/list_small", getCommunitySmallList);
// 获取单个小区列表
router.get("/list/:id", getCommunityOneList);
// 更新单个小区
router.post("/list", updateCommunityList);
// 添加小区列表
router.put("/list", addCommunityList);
// 删除小区列表
router.delete("/list", deleteCommunityList);

export default router;
