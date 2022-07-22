import connection from "../database/database.js";

export async function getCategories(req, res){
    const { rows: categories } = await connection.query('SELECT * FROM categories');     
        
    res.status(200).send(categories);
}

export async function postCategory(req, res){
    const { name } = req.body;

    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);

    res.status(201).send("Categoria criada com sucesso");
}