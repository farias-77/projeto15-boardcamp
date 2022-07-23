import connection from "../database/database.js";

export async function postCustomer(req, res){
    
    const { name, phone, cpf, birthday } = req.body;
    
    try{
        const customer = await connection.query(`
            INSERT INTO customers 
            ("name", "phone", "cpf", "birthday") 
            VALUES ($1, $2, $3, $4)`, 
            [name, phone, cpf, birthday]);
        
        res.status(201).send("Usuário criado com sucesso!");
    }catch{
        res.status(400).send("Algo deu errado, por favor tente novamente.");
    }
}

export async function getCustomers(req, res){
    const cpf = req.query.cpf;

    let { rows: customers } = await connection.query(`
        SELECT *
        FROM customers
    `);


    if(Number(cpf)){        
        return res.status(200).send(
            customers
            .filter(customer => customer.cpf.startsWith(cpf))
        )   
    }

    res.status(200).send(customers);
}