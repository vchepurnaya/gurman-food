const fs = require('fs');
const responseSender = require('../../../helpers/response-sender');

const userFavoritesHandlerPost = (req, res) => {
    const { id, userEmail } = req.body;

    if (
        !id
        || !userEmail
        || Object.keys(req.body).length !== 2
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const rawData = fs.readFileSync('./BACKEND/DB/users.json');
    const users = JSON.parse(rawData);
    const user = users.find(u => u.email === userEmail);

    if (!user) {
        return responseSender(res, 404, 'User doesn\'t exist!');
    }

    if (user.favorites.includes(id)) {
      return responseSender(res, 409, 'This restaurant is already in favourites!');
    }

    const updatedUsers = users.map(u => {
        if (u.email === userEmail) {
            u.favorites.push(id);
        }

        return u;
    })

    try {
        fs.writeFileSync('./BACKEND/DB/users.json', JSON.stringify(updatedUsers));
        responseSender(res, 200, 'The restaurant added to your favorites!');

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = userFavoritesHandlerPost;
