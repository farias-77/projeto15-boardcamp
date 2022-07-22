import express from "express";
import { gameInfoValidation, gameExistsValidation, categoryExistsValidation } from "../middlewares/gamesMiddlewares.js";
import { postGame } from "../controllers/gamesController.js";

const router = express.Router();

router.get("/games", );
router.post("/games", gameInfoValidation, categoryExistsValidation, gameExistsValidation, postGame);

export default router;