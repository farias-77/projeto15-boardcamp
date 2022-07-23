import gamesSchema from "../schemas/gamesSchema.js";
import connection from "../database/database.js";
import joi from "joi";

export async function gameInfoValidation(req, res, next){

    const gameInfo = req.body;

    const { error } = gamesSchema.validate(gameInfo);
    
    if(joi.isError(error)){
        return res.sendStatus(400);
    }

    next();
}

export async function categoryExistsValidation(req, res, next){
    try{
        const gameInfo = req.body;

        const categories = await connection.query('SELECT id FROM categories');

        if(!(categories.rows.find(category => category.id === gameInfo.categoryId))){
            return res.sendStatus(400);
        }

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}

export async function gameExistsValidation(req, res, next){
    try{
        const { name } = req.body;
    
        const names = await connection.query('SELECT name FROM games');
        
        if(names.rows.find(game => game.name === name)){
            return res.status(409).send("Já existe um jogo com esse nome!");
        }

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}