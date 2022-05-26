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
            console.log(rental);
            const isNew = await isRentalUrlUnique(rental.url);
            console.log("Is rental new:", isNew);
            if (isNew) createQueue.push(Rental.create(rental));
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
