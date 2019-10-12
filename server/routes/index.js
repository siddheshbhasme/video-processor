const VideoRoutes = require("./video");
const CommentRoutes = require("./comment");
const {
    authorize
} = require("../middlewares");

const setupRoutes = (app) => {
    app.use("/api/v1", authorize, VideoRoutes);
    app.use("/api/v1", authorize, CommentRoutes);
}

module.exports = setupRoutes;