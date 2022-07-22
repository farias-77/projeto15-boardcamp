import { gameInfoValidation, gameExistsValidation, categoryExistsValidation } from "../middlewares/gamesMiddlewares.js";
import { postGame } from "../controllers/gamesController.js";
import { getGames } from "../controllers/gamesController.js";
import express from "express";

const router = express.Router();

router.get("/games", getGames);
router.post("/games", gameInfoValidation, categoryExistsValidation, gameExistsValidation, postGame);

export default router;