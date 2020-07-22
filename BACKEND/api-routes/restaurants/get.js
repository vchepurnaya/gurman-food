const fs = require('fs');
const responseSender = require('../../helpers/response-sender');

const restaurantsHandlerGet = async (req, res) => {
    const rawData = fs.readFileSync('./BACKEND/DB/restaurants.json');
    const restaurants = JSON.parse(rawData);
    // const id = req.query.id;

    // if (id) {
    //     const event = events.find(evt => evt.id === id);

    //     return event
    //         ? responseSender(res, 200, 'Got it!', event)
    //         : responseSender(res, 404, 'Event not found!');  
    // }

    responseSender(res, 200, 'Got it!', restaurants);    
};

module.exports = restaurantsHandlerGet;