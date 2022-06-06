import {
  getVehicleInfo,
  addVehicleInfo,
  getVehicleInfoById,
  updateVehicleInfo,
  deleteVehicleInfo,
} from "../controller/vehicleControl";
import { GenerateRouter } from "../utils/GenerateRouter";

const { router } = GenerateRouter("/vehicle");

// 获取车辆信息
router.get("/", getVehicleInfo);
// 添加车辆信息
router.post("/", addVehicleInfo);
// 根据id获取车辆信息
router.get("/id", getVehicleInfoById);
// 更新车辆信息
router.put("/id", updateVehicleInfo);
// 删除车辆信息
router.delete("/id", deleteVehicleInfo);

export default router;
