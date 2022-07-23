import { postRental, getRentals } from "../controllers/rentalsController.js";
import { rentalBodyValidation, customerExistsValidation, gameExistsValidation, getPricePerDay, gameUnitAvailableValidation } from "../middlewares/rentalsMiddlewares.js";
import express from "express";

const router = express.Router();

router.post("/rentals", rentalBodyValidation, customerExistsValidation, gameExistsValidation, gameUnitAvailableValidation, getPricePerDay, postRental);
router.get("/rentals", getRentals)
export default router;