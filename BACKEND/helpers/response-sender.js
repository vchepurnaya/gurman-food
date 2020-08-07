const responseSender = (res, code, message, content) => {
    const objToSend = {
        code,
        message
    };

    if (typeof content !== undefined) {
        objToSend['content'] = content;
    }

    res.status(code).json(objToSend);
};

module.exports = responseSender;