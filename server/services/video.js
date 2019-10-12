const VideoModel = require("../models").Video;
const process =require("../utils/video-processor");

const UploadVideo = async (file, username) => {

    const video = new VideoModel({
        name: file.originalname,
        creatorName: username
    })

    return video.save()
}

const GetVideo = async (id) => {
    return await VideoModel.get(id);
}

const DeleteVideo = async (id, user) => {
    return await VideoModel.delete(id, user);
}

const GetAllVideos = async (options) => {
    return await VideoModel.list(options)
}


module.exports = {
    UploadVideo,
    GetVideo,
    GetAllVideos,
    DeleteVideo
}