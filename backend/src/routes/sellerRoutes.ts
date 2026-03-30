import { Router } from "express";
import { checkUserRole, registerSeller, updateSellerInfo } from "../controllers/sellerController";

const router = Router();

router.post("/register", registerSeller);
router.put("/update", updateSellerInfo);
router.get("/check-role/:email", checkUserRole);

export default router;