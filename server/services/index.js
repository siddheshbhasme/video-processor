const Comments = require("./comments");
const Videos = require("./video");

module.exports = {
    ...Comments,
    ...Videos
}

