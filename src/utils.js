const { Rental } = require("../server/db");

const isRentalUrlUnique = async (url) => {
    try {
        const token = await Rental.findOne({ where: { url } });
        return token === null;
    } catch (err) {
        return err;
    }
};

const batchCreateRentalsIfNotExists = async (rentals) => {
    try {
        if (rentals.length === 0) return;

        const createQueue = [];
        for (const rental of rentals) {
            const isNew = await isRentalUrlUnique(rental.url);
            if (isNew) {
                console.log("New apartment found:", rental);
                createQueue.push(Rental.create(rental));
            } else {
                break;
            }
        }

        const newRentals = await Promise.all(createQueue);

        return newRentals;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

module.exports = {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
};
