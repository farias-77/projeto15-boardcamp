import connection from "../database/database.js";

export async function getCategories(req, res){
    try{
        const { rows: categories } = await connection.query('SELECT * FROM categories');     
        
        return res.status(200).send(categories);
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}

export async function postCategory(req, res){
    const { name } = req.body;

    try{
        await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);

        return res.status(201).send("Categoria criada com sucesso");
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}