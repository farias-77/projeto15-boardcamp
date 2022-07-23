import dayjs from "dayjs";
import connection from "../database/database.js";

export async function postRental(req, res){

    const { daysRented, customerId, gameId } = req.body;

    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = res.locals.pricePerDay * daysRented;
    const returnDate = null;
    const delayFee = null;

    try{

        await connection.query(`
            INSERT INTO 
            rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES  
            ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);

        return res.status(201).send("Aluguel criado com sucesso.");
    }catch{
        return res.send("Ocorreu um erro inesperado, tente novamente.");
    }
    
    res.send('siiu')
}

export async function getRentals(req, res){

    try{

        const { rows: rentals} = await connection.query(`
            SELECT *, customers.id, customers.name, games.id, games.name, games."categoryId", games."categoryName"
            FROM rentals
            JOIN customers
            ON customers.id = rentals."customerId"
            JOIN games
            ON games.id = rentals."gameId"
        `);

        return res.send(rentals);

    }catch{
        return res.send("Ocorreu um erro inesperado, tente novamente.");
    }
}