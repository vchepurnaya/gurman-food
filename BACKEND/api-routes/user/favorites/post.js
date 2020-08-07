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

    const isInFavorites = user.favorites.includes(id);
    const updatedUsers = users.map(u => {
        if (u.email === userEmail) {
            if (isInFavorites) {
                u.favorites = u.favorites.filter(favId => favId !== id);    
            } else {
                u.favorites.push(id);
            }
        }

        return u;
    })

    try {
        fs.writeFileSync('./BACKEND/DB/users.json', JSON.stringify(updatedUsers));
        responseSender(
            res,
            200,
            'The restaurant ' + (isInFavorites ? 'was removed from' : 'was added to') + ' your favorites!',
            !isInFavorites
        );

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = userFavoritesHandlerPost;
