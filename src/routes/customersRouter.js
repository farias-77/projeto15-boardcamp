import express from "express";
import { customerInfoValidation, existentCpfValidation } from "../middlewares/customersMiddlewares.js";
import { postCustomer } from "../controllers/customersController.js";  

const router = express.Router();

router.get("/customers", );
router.post("/customers", customerInfoValidation,  existentCpfValidation, postCustomer);

export default router;