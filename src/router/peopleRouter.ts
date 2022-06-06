import {
  addPeopleInfo,
  deletePeopleInfoById,
  getFilterPeopleInfo,
  getPeopleIdAndName,
  getPeopleInfoById,
  updatePeopleInfo,
} from "../controller/peopleControl";
import { GenerateRouter } from "../utils/GenerateRouter";

const { router } = GenerateRouter("/people");

// 获取成员信息
router.get("/member", getPeopleIdAndName);
// 根据id获取人员信息
router.get("/:id", getPeopleInfoById);
// 根据id更新人员信息
router.put("/id", updatePeopleInfo);
// 根据id删除人员信息
router.delete("/id", deletePeopleInfoById);
// 根据条件获取人员信息
router.post("/filter", getFilterPeopleInfo);
// 添加个人信息
router.put("/", addPeopleInfo);

export default router;
