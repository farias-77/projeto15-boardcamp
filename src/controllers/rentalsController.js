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
        const { rows: rentals } = await connection.query(`
            SELECT rentals.*, customers.id as "idCustomerTable", customers.name as "customerName", games.id as "idGameTable", games.name as "gameName", games."categoryId", categories.id as "idCategoryTable", categories.name as "categoryName"
            FROM rentals
            JOIN customers
            ON customers.id = rentals."customerId"
            JOIN games
            ON games.id = rentals."gameId"
            JOIN categories
            ON categories.id = games."categoryId"
        `);

        const formattedRentals = rentals
            .map(rental => {
                const rentalModel = {
                    ...rental, 
                    customer:{id: rental.idCustomerTable, name: rental.customerName},
                    game: { id: rental.idGameTable, name: rental.gameName, categoryId: rental.categoryId, categoryName: rental.categoryName }
                }
                
                //rentalModel.rentDate = rentalModel.rentDate.slice(0,10);

                delete rentalModel.idCustomerTable;
                delete rentalModel.customerName;
                delete rentalModel.idGameTable;
                delete rentalModel.gameName;
                delete rentalModel.categoryId;
                delete rentalModel.categoryName;
                delete rentalModel.idCategoryTable;

                return rentalModel;
            });

        return res.send(formattedRentals);

    }catch{
        return res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
    }
}