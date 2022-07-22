import express from "express";
import { getCategories, postCategory } from "../controllers/categoriesController.js";
import { emptyNameValidation, existentCategoryValidation } from "../middlewares/categoriesMiddlewares.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", emptyNameValidation, existentCategoryValidation, postCategory);

export default router;