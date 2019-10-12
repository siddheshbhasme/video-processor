const authorize = require("./authorization");
const upload = require("./multer");
const setupSwagger = require("./swagger");
module.exports = {
    authorize,
    setupSwagger,
    upload
};