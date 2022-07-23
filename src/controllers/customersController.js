import connection from "../database/database.js";

export async function postCustomer(req, res){
    
    const { name, phone, cpf, birthday } = req.body;

    try{
        await connection.query(`
            INSERT INTO customers 
            ("name", "phone", "cpf", "birthday") 
            VALUES ($1, $2, $3, $4)`, 
            [name, phone, cpf, birthday]);
    
        res.status(201).send("Usuário criado com sucesso!");
    }catch{
        res.status(400).send("Algo deu errado, por favor tente novamente.");
    }
}