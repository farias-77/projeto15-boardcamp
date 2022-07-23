import connection from "../database/database.js";

export async function postGame(req, res){

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try{
        await connection.query(`
            INSERT INTO games 
            ("name", "image", "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5)
        `, [name, image, stockTotal, categoryId, pricePerDay]);
    
         return res.status(201).send("Jogo criado com sucesso!");
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}

export async function getGames(req, res){

    let gameInitials = req.query.name;

    try{
        const { rows: games } = await connection.query(`
            SELECT games.*, categories.name AS "categoryName"
            FROM games
            JOIN categories
            ON games."categoryId" = categories.id
        `);

        if(gameInitials){
            gameInitials = gameInitials.toLowerCase();
            
            return res.status(200).send(
                games
                .map(game => {game.name = game.name.toLowerCase(); return game})
                .filter(game => game.name.startsWith(gameInitials))
            )   
        }

        return res.status(200).send(games);
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}