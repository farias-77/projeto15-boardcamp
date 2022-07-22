import categoriesSchema from "../schemas/categoriesSchema.js";
import connection from "../database/database.js";
import joi from "joi";

export async function emptyNameValidation(req, res, next){
    const { name } = req.body;

    const { error } = categoriesSchema.validate({ name });

    if(joi.isError(error)){
        return res.sendStatus(400);
    }

    next();
}

export async function existentCategoryValidation(req, res, next){
    const { name } = req.body;

    const categories = await connection.query('SELECT name FROM categories');

    if(categories.rows.find(category => category.name === name)){
        return res.sendStatus(409);
    }

    next();
}