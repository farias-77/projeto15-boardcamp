import { postRental } from "../controllers/rentalsController.js";
import { rentalBodyValidation, customerExistsValidation, gameExistsValidation, getPricePerDay, gameUnitAvailableValidation } from "../middlewares/rentalsMiddlewares.js";
import express from "express";

const router = express.Router();

router.post("/rentals", rentalBodyValidation, customerExistsValidation, gameExistsValidation, gameUnitAvailableValidation, getPricePerDay, postRental);

export default router;