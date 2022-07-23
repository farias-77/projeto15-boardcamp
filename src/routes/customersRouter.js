import express from "express";
import { customerInfoValidation, existentCpfValidation } from "../middlewares/customersMiddlewares.js";
import { postCustomer, getCustomers } from "../controllers/customersController.js";  

const router = express.Router();

router.get("/customers", getCustomers);
router.post("/customers", customerInfoValidation,  existentCpfValidation, postCustomer);

export default router;