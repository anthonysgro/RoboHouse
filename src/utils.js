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
        for (const { url, description } of rentals) {
            const isNew = await isRentalUrlUnique(url);
            if (isNew) createQueue.push(Rental.create({ url, description }));
        }

        const newRentals = Promise.all(createQueue);

        return newRentals;
    } catch (err) {
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