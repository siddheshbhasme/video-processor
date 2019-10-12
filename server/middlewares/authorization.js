const {
    OAuth2Client
} = require('google-auth-library');
const HttpStatus = require('http-status-codes');
const config = require("../config");
const {
    error,
    messages
} = require("../utils/response");


const authorize = (req, res, next) => {
    const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

    if (process.env.NODE_ENV === 'test') {
        req.user = "testuser";
        return next();
    }

    if (!req.headers || !req.headers.authorization) {
        res.status(HttpStatus.UNAUTHORIZED).send(error(
            HttpStatus.UNAUTHORIZED,
            undefined,
            messages.AUTH_ERROR
        ));
        return next(messages.AUTH_ERROR);
    }

    const [ , token] = req.headers.authorization.split(' ');
    const verify = async () => {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    }

    verify()
        .then((data) => {
            req.user = data.email || data.name;
            return next();
        })
        .catch((err) => {
            res.status(HttpStatus.UNAUTHORIZED).send(error(
                HttpStatus.UNAUTHORIZED,
                undefined,
                messages.AUTH_ERROR
            ));
            return next(err);
        });
}

module.exports = authorize;