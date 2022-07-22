import categoriesSchema from "../schemas/categoriesSchema.js";
import connection from "../database/database.js";
import joi from "joi";

export async function emptyNameValidation(req, res, next){
    const { name } = req.body;

    const { error } = categoriesSchema.validate({ name });

    if(joi.isError(error)){
        return res.status(400).send("Campo 'name' não pode ficar vazio");
    }

    next();
}

export async function existentCategoryValidation(req, res, next){
    const { name } = req.body;

    const categories = await connection.query('SELECT name FROM categories');

    if(categories.rows.find(category => category.name === name)){
        return res.status(409).send("Já existe uma categoria com esse nome!");
    }

    next();
}