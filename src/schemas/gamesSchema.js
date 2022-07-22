import joi from "joi";

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().integer().min(1),
    pricePerDay: joi.number().min(1),
    categoryId: joi.number().min(1)
})

export default gamesSchema;