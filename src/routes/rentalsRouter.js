import { postRental, getRentals, returnRental, deleteRental } from "../controllers/rentalsController.js";
import { rentalBodyValidation, customerExistsValidation, gameExistsValidation, getPricePerDay, gameUnitAvailableValidation, rentalExistsValidation, rentalFinishedValidation, rentalNotFinishedValidation } from "../middlewares/rentalsMiddlewares.js";
import express from "express";

const router = express.Router();

router.post("/rentals", rentalBodyValidation, customerExistsValidation, gameExistsValidation, gameUnitAvailableValidation, getPricePerDay, postRental);
router.get("/rentals", getRentals);
router.post("/rentals/:id/return", rentalExistsValidation, rentalFinishedValidation, returnRental);
router.delete("/rentals/:id", rentalExistsValidation, rentalNotFinishedValidation, deleteRental)

export default router;