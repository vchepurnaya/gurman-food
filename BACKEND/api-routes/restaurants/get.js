const fs = require('fs');
const responseSender = require('../../helpers/response-sender');

const restaurantsHandlerGet = async (req, res) => {
    const rawData = fs.readFileSync('./BACKEND/DB/restaurants.json');
    const restaurants = JSON.parse(rawData);
    const id = req.query.id;

    if (id) {
        const restaurant = restaurants.find(r => r.id === id);

        return restaurant
            ? responseSender(res, 200, 'Got it!', restaurant)
            : responseSender(res, 404, 'Restaurant not found!');  
    }

    responseSender(res, 200, 'Got it!', restaurants);    
};

module.exports = restaurantsHandlerGet;