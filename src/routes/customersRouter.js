import express from "express";
import { customerInfoValidation, existentCpfValidation } from "../middlewares/customersMiddlewares.js";
import { postCustomer, getCustomers, getCustomerById } from "../controllers/customersController.js";  

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", customerInfoValidation,  existentCpfValidation, postCustomer);

export default router;