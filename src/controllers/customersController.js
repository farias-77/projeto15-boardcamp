import connection from "../database/database.js";

export async function postCustomer(req, res){
    try{
        let { name, phone, cpf, birthday } = req.body;
        console.log(birthday);
        birthday = dayjs(birthday).format("YYYY-MM-DD");
        console.log(birthday);
        
        await connection.query(`
            INSERT INTO customers 
            ("name", "phone", "cpf", "birthday") 
            VALUES ($1, $2, $3, $4)`, 
            [name, phone, cpf, birthday]);
        
        return res.status(201).send("Usuário criado com sucesso!");
    }catch{
        return res.status(500).send("Algo deu errado, por favor tente novamente.");
    }
}

export async function getCustomers(req, res){
    const cpf = req.query.cpf;

    try{
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

        return res.status(200).send(customers);
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}

export async function getCustomerById(req, res){

    const { id } = req.params;

    try{
        const customerById = await connection.query(`
            SELECT *
            FROM customers
            WHERE customers.id = $1    
        `, [id]);

        if(customerById.rows.length === 0){
            return res.status(404).send("Não existe um usuário com esse Id!");
        }

        return res.send(customerById.rows);
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}

export async function updateCustomer(req, res){

    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try{
        await connection.query(`
            UPDATE customers
            SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE customers.id = $5
        `, [name, phone, cpf, birthday, id]);

        return res.status(200).send("Usuário atualizado com sucesso!");
    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}