const fs = require('fs');
const responseSender = require('../../../helpers/response-sender');

const userFavoritesHandlerGet = (req, res) => {
    const userEmail = req.query.email;

    if (
        !userEmail
        || Object.keys(req.query) !== 1
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }
    
    const rawUsersData = fs.readFileSync('./BACKEND/DB/users.json');
    const rawReastaurantsData = fs.readFileSync('./BACKEND/DB/restaurants.json');
    const usersData = JSON.parse(rawUsersData);
    const restaurantsData = JSON.parse(rawReastaurantsData);
    const user = usersData.find(u => u.email === userEmail);

    if (!user) {
        return responseSender(res, 404, 'User not found!');
    }

    const favoriteRestaurants = restaurantsData.filter(
        restaurant => user.favorites.includes(restaurant.id)
    );

    responseSender(res, 200, 'Got it!', favoriteRestaurants);
};

module.exports = userFavoritesHandlerGet;