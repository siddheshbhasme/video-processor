const express = require('express')
const path = require("path");
const bodyParser = require("body-parser");
const setupRoutes = require("./routes");
const { setupSwagger } = require("./middlewares");

// Init app
const app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Error Handler
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).send({
        err
    });
})

// Load Routes
app.use("/static", express.static(path.join(__dirname, 'public')))
setupRoutes(app);
setupSwagger(app);

module.exports = app;