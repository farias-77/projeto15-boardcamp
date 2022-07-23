import express from "express";
import { customerInfoValidation, existentCpfValidation, idCpfValidation } from "../middlewares/customersMiddlewares.js";
import { postCustomer, getCustomers, getCustomerById, updateCustomer } from "../controllers/customersController.js";  

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", customerInfoValidation, existentCpfValidation, postCustomer);
router.put("/customers/:id", customerInfoValidation, idCpfValidation, updateCustomer);
export default router;