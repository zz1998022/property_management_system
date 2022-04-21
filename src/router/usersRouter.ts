import { GenerateRouter } from "../utils/GenerateRouter";
import { userRegister, usersLogin } from "../controller/usersControl";

const { router } = GenerateRouter("/users");

// 登录路由
router.post("/login", usersLogin);
// 注册路由
router.post("/register", userRegister);

export default router;
