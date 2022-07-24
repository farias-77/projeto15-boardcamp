import joi from "joi";
import rentalsSchema from "../schemas/rentalsSchema.js";
import connection from "../database/database.js";

export async function rentalBodyValidation(req, res, next){

    const rental = req.body;

    const { error } = rentalsSchema.validate(rental);

    if(joi.isError(error)){
        return res.status(400).send("Por favor, envie apenas números maiores do que 0.");
    }

    next();
}

export async function customerExistsValidation(req, res, next){

    try{
        const { customerId } = req.body;

        const { rows: customer } = await connection.query(`
            SELECT *
            FROM customers
            WHERE customers.id = $1
        `, [customerId]);

        if(customer.length === 0){
            return res.status(400).send("Não foi encontrado nenhum usuário com o id informado");
        }

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}

export async function gameExistsValidation(req, res, next){
    try{
        const { gameId } = req.body;

        const { rows: game } = await connection.query(`
            SELECT *
            FROM games
            WHERE games.id = $1
        `, [gameId]);

        if(game.length === 0){
            return res.status(400).send("Não foi encontrado nenhum jogo com o id informado");
        }

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}

export async function gameUnitAvailableValidation(req, res, next){
    try{
        const { gameId } = req.body;

        const { rows: game } = await connection.query(`
            SELECT games."stockTotal"
            FROM games
            WHERE games.id = $1
        `, [gameId]);

        const stockTotal = game[0].stockTotal;

        const { rows: rentals } = await connection.query(`
            SELECT *
            FROM rentals
            WHERE rentals."gameId" = $1
        `, [gameId]);

        if(rentals.length >= stockTotal){
            return res.status(400).send("Não existem unidades disponíveis para locação");
        }

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}

export async function getPricePerDay(req, res, next){

    try{
        const { gameId } = req.body;

        const { rows: game } = await connection.query(`
            SELECT games."pricePerDay"
            FROM games
            WHERE games.id = $1  
        `, [gameId]);

        res.locals.pricePerDay = game[0].pricePerDay;

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}

export async function rentalExistsValidation(req, res, next){
    try{
        const { id } = req.params;

        const { rows: rental } = await connection.query(`
            SELECT * 
            FROM rentals
            WHERE rentals.id = $1
        `, [id]);

        if(rental.length === 0){
            return res.status(404).send("Não foi encontrado nenhum aluguel com o id fornecido.");
        }

        res.locals.rental = rental[0];

        next();
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente");
    }
}

export async function rentalFinishedValidation(req, res, next){

    const rental = res.locals.rental;

    if(rental.returnDate){
        return res.status(400).send("Aluguel já finalizado");
    }

    next();
}

export async function rentalNotFinishedValidation(req, res, next){
    const rental = res.locals.rental;

    if(!rental.returnDate){
        return res.status(400).send("Aluguel ainda não foi finalizado!");
    }

    next();
}