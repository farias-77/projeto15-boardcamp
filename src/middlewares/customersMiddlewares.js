import joi from "joi";
import customersSchema from "../schemas/customersSchemas.js";
import connection from "../database/database.js";

export async function customerInfoValidation(req, res, next){

    const customer = req.body;

    const { error } = customersSchema.validate(customer);

    if(joi.isError(error)){
        return res.sendStatus(400);
    }

    if(!Number(customer.cpf) && !Number(customer.phone)){
        return res.sendStatus(400);
    }

    next();
}

export async function existentCpfValidation(req, res, next){

    const { cpf } = req.body;

    const dbCustomer = await connection.query(`
        SELECT *  
        FROM customers
        WHERE customers.cpf = $1
    `, [cpf]);


    if(dbCustomer.rows.length !== 0){
        return res.status(409).send("CPF já cadastrado");
    }

    next();
}