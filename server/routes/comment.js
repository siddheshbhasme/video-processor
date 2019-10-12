const Router = require("express").Router;
const HttpStatus = require('http-status-codes');
const {
    success,
    error,
    messages
} = require("../utils/response");

const {
    GetVideoComments,
    AddVideoComment,
    DeleteVideoComment
} = require("../services");

const routes = Router();

/**
 * @swagger
 * /api/v1/videos/{video_id}/comments:
 *   get:
 *     parameters:
 *      - in: path
 *        name: video_id
 *        required: true
 *        schema:
 *          type: guid
 *        description: Video ID
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: Page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Page size
 *     tags:
 *       - Comments
 *     security: 
 *         - Bearer: []
 *     description: Adds a comment on video
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 */
routes.get("/videos/:id/comments", async (req, res) => {
    const data = await GetVideoComments(req.params.id, req.query);
    res.send(success(HttpStatus.OK,
        data,
        messages.GET_SUCCESS
    ));
});

/**
 * @swagger
 * /api/v1/videos/{video_id}/comments:
 *   post:
 *     parameters:
 *      - in: path
 *        name: video_id
 *        required: true
 *        schema:
 *          type: guid
 *        description: Video ID
 *      - in: body
 *        name: comment
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            comment:
 *              type: string
 *        description: Comment text
 *     tags:
 *       - Comments
 *     security: 
 *         - Bearer: []
 *     description: Adds a comment on video
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 */
routes.post("/videos/:id/comments", async (req, res) => {
    const data = await AddVideoComment(req.params.id, req.body.comment, req.user);
    res.send(success(HttpStatus.OK,
        data,
        messages.POST_SUCCESS
    ));
});


/**
 * @swagger
 * /api/v1/videos/{video_id}/comments/{comment_id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: video_id
 *        required: true
 *        schema:
 *          type: guid
 *        description: Video ID
 *      - in: path
 *        name: comment_id
 *        required: true
 *        schema:
 *          type: guid
 *        description: Comment ID
 *     tags:
 *       - Comments
 *     security: 
 *         - Bearer: []
 *     description: Deletes a comment on video
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Delete Successful
 */
routes.delete("/videos/:id/comments/:comment", async (req, res) => {
    const data = await DeleteVideoComment(req.params.id, req.params.comment, req.user);
    if (data) {
        return res.status(HttpStatus.OK)
            .send(success(HttpStatus.OK,
                undefined,
                messages.DELETE_SUCCESS
            ));
    }
    return res.status(HttpStatus.BAD_REQUEST)
        .send(success(HttpStatus.BAD_REQUEST,
            undefined,
            messages.NO_DELETE
        ));

});

module.exports = routes;