import { getCommunityList } from "./../controller/communityControl";
import { GenerateRouter } from "../utils/GenerateRouter";
import {
  getCommunityName,
  getCommunityDetail,
  addCommunityList,
} from "../controller/communityControl";

const { router } = GenerateRouter("/community");

// 获取所有小区的名字
router.get("/name", getCommunityName);
// 获取小区的详情信息
router.post("/detail/:code", getCommunityDetail);
// 获取小区列表
router.get("/list", getCommunityList);
// 添加小区列表
router.put("/list", addCommunityList);

export default router;
