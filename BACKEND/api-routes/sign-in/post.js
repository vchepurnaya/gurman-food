const fs = require('fs');
const bcrypt = require('bcrypt');
const responseSender = require('../../helpers/response-sender');

const signInHandlerPost = async (req, res) => {
    const credsToLogin = req.body;

    if (
        !credsToLogin.login
        || !credsToLogin.password
        || Object.keys(credsToLogin).length !== 2
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const rawData = fs.readFileSync('./BACKEND/DB/users.json');
    const users = JSON.parse(rawData);
    const user = users.find(user => user.login === credsToLogin.login);

    if (!user) {
        return responseSender(res, 401, 'Authentication failed. User not found!');
    }

    const isPasswordTheSame = bcrypt.compareSync(credsToLogin.password, user.password);

    if (!isPasswordTheSame) {
        return responseSender(res, 401, 'Authentication failed. Wrong password!');
    }

    delete user.password;

    responseSender(res, 200, 'Authentication succeeded!', user);
};

module.exports = signInHandlerPost;
