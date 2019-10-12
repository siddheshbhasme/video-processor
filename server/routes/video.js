const Router = require("express").Router;
const fs = require("fs");
const HttpStatus = require('http-status-codes');
const config = require("../config");
const {
    upload
} = require("../middlewares");

const {
    success,
    error,
    messages
} = require("../utils/response");

const {
    UploadVideo,
    GetAllVideos,
    GetVideo,
    DeleteVideo
} = require("../services");


const routes = new Router();

/**
 * @swagger
 * /api/v1/videos:
 *   post:
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: video
 *         in: formData
 *         description: file to  upload
 *         required: true
 *         type: file
 *     tags:
 *       - Videos
 *     security: 
 *         - Bearer: []
 *     description: Uploads a video
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Response with ID for the file
 */
routes.post("/videos", upload.single(config.fileField), async (req, res) => {
    const data = await UploadVideo(req.file, req.user);
    res.send(success(HttpStatus.OK, {
        id: data.id
    },
        messages.UPLOAD_SUCCESS
    ));
});

/**
 * @swagger
 * /api/v1/videos:
 *   get:
 *     parameters:
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
 *      - in: query
 *        name: creatorName
 *        schema:
 *          type: string
 *        description: User id to filter videos by
 *     tags:
 *       - Videos
 *     security: 
 *         - Bearer: []
 *     description: Returns list of all videos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of videos
 */
routes.get("/videos", async (req, res) => {
    req.query.criteria = {};
    Object.keys(req.query).forEach((key) => {
        if (key !== "page" && key !== "limit" && key !== "criteria") {
            req.query.criteria[key] = req.query[key];
        }
    });
    const data = await GetAllVideos(req.query);
    res.send(success(HttpStatus.OK,
        data,
        messages.GET_SUCCESS
    ));
});


/**
 * @swagger
 * /api/v1/videos/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: guid
 *        description: Video ID
 *     tags:
 *       - Videos
 *     security: 
 *         - Bearer: []
 *     description: Returns a videos file
 *     produces:
 *       - video/mp4
 *     responses:
 *       200:
 *         description: Video Content
 */

routes.get("/videos/:id", async (req, res) => {
    const video = await GetVideo(req.params.id);
    if (video) {
        let downloadPath = `${config.processedDir}/${video.creatorName}/${video.name}`;
        const uploadPath = `${config.uploadDir}/${video.creatorName}/${video.name}`;
        fs.exists(downloadPath, (exists) => {
            if (!exists) {
                downloadPath = uploadPath;
            }
            res.download(downloadPath);
        });
    } else {
        res.send(error(HttpStatus.NOT_FOUND,
            undefined,
            messages.NOT_FOUND
        ));
    }

});


/**
 * @swagger
 * /api/v1/videos/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: guid
 *        description: Video ID
 *     tags:
 *       - Videos
 *     security: 
 *         - Bearer: []
 *     description: Deletes a video with comments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Delete Successful
 */
routes.delete("/videos/:id", async (req, res) => {
    const data = await DeleteVideo(req.params.id, req.user);
    if (data.deletedCount > 0) {
        return res.status(HttpStatus.OK)
            .send(success(HttpStatus.OK,
                data,
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