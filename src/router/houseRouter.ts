import {
  getHouseFilterInfo,
  getHouseInfo,
  addHouseInfo,
  getHouseInfoById,
  updateHouseInfoById,
  deleteHouseInfoById,
  getHouseList,
} from "../controller/houseControl";
import { GenerateRouter } from "../utils/GenerateRouter";

const { router } = GenerateRouter("/house");

// 获取房产信息
router.get("/", getHouseInfo);
// 根据id获取房产信息
router.get("/id", getHouseInfoById);
// 获取分类后的房产信息
router.post("/filter", getHouseFilterInfo);
// 添加房产信息
router.put("/", addHouseInfo);
// 更新房产信息
router.post("/", updateHouseInfoById);
// 删除房产信息
router.delete("/", deleteHouseInfoById);
// 获取房产列表
router.get("/list", getHouseList);

export default router;
