const fs = require('fs');
const sha1 = require('sha1');
const responseSender = require('../../helpers/response-sender');

const restaurantsHandlerPost = async (req, res) => {
    // const eventToSave = req.body;

    // if (
    //     !eventToSave.type
    //     || !eventToSave.title
    //     || !eventToSave.description
    //     || !eventToSave.date
    //     || !eventToSave.userEmail
    //     || Object.keys(eventToSave).length !== 5
    // ) {
    //     return responseSender(res, 422, 'You\'ve missed something important...');
    // }

    // const rawEventsData = fs.readFileSync('./BACKEND/DB/events.json');
    // const rawUsersData = fs.readFileSync('./BACKEND/DB/users.json');
    // const events = JSON.parse(rawEventsData);
    // const users = JSON.parse(rawUsersData);
    // const user = users.find(user => user.email === eventToSave.userEmail);

    // if (!user) {
    //     return responseSender(res, 404, 'User not found!');
    // }

    // const userForEvent = {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email
    // };

    // eventToSave.id = sha1(Date.now());
    // eventToSave.creator = userForEvent;
    // eventToSave.visitors = [userForEvent]
    // delete eventToSave.userEmail;
    
    // events.push(eventToSave);
    // user.createdEvents.push(eventToSave.id);
    // user.eventsToVisit.push(eventToSave.id);

    // try {
    //     fs.writeFileSync('./BACKEND/DB/events.json', JSON.stringify(events));
    //     fs.writeFileSync('./BACKEND/DB/users.json', JSON.stringify(users));
    //     responseSender(res, 200, 'The new event created!', eventToSave);

    // } catch (err) {
    //     responseSender(res, 500, err.message);
    // }  
};

module.exports = restaurantsHandlerPost;