import { GenerateRouter } from "../utils/GenerateRouter";
import { getCommunityName } from "../controller/communityControl";

const { router } = GenerateRouter("/community");

// 获取所有小区的名字
router.get("/name", getCommunityName);

export default router;
