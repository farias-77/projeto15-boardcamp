import connection from "../database/database.js";

export async function postGame(req, res){

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    await connection.query(
       `INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5)`, 
        [name, image, stockTotal, categoryId, pricePerDay]);
    
    res.status(201).send("Jogo criado com sucesso!");
}