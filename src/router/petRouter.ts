import {
  addPetInfo,
  deletePetInfo,
  getPetInfo,
  getPetInfoById,
  updatePetInfo,
} from "../controller/petControl";
import { GenerateRouter } from "../utils/GenerateRouter";

const { router } = GenerateRouter("/pet");

// 获取宠物信息
router.get("/", getPetInfo);
// 添加宠物信息
router.put("/", addPetInfo);
// 根据id获取宠物信息
router.get("/id", getPetInfoById);
// 更新宠物信息
router.post("/", updatePetInfo);
// 删除宠物信息
router.delete("/", deletePetInfo);

export default router;
