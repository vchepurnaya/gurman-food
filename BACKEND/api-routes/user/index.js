const fs = require('fs');
const responseSender = require('../../helpers/response-sender');

const userHandlerGet = async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }
    
    const rawData = fs.readFileSync('./BACKEND/DB/users.json');
    const users = JSON.parse(rawData);
    const user = users.find(user => user.email === email);

    if (!user) {
        return responseSender(res, 401, 'Authentication failed. User not found!');
    }

    delete user.password;

    responseSender(res, 200, 'Got it!', user);
};

module.exports = userHandlerGet;