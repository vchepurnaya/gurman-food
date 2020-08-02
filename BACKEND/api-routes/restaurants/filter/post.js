const fs = require('fs');
const responseSender = require('../../../helpers/response-sender');

const restaurantsFilterHandlerPost = async (req, res) => {
    const filters = req.body;
    const filtersKeys = Object.keys(filters);
    const isRightKeys = !filtersKeys.some(key =>
        key !== 'kitchen' && key !== 'features' && key !== 'type'
    );
    const isRightValues = Object.values(filters).every(val => val && val.length);

    if (!isRightKeys || !isRightValues) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const rawRestaurantsData = fs.readFileSync('./BACKEND/DB/restaurants.json');
    const restaurants = JSON.parse(rawRestaurantsData);
    const filteredRestaurants = restaurants.filter(restaurant =>
        filtersKeys.every(key => {
            const valuesFromFilter = filters[key];

            return restaurant[key].some(valueFromRestaurant =>
                valuesFromFilter.includes(valueFromRestaurant)
            );
        })
    );

    responseSender(res, 200, 'Ok!', filteredRestaurants);
};

module.exports = restaurantsFilterHandlerPost;