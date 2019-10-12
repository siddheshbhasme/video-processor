const VideoModel = require("../models").Video;

const GetVideoComments = async (id, query) => {
    const video = await VideoModel.get(id)
    return await video.listComments(query)
};

const AddVideoComment = async (id, comment, user) => {
    const video = await VideoModel.get(id)
    return await video.addComment(user, comment);
};

const DeleteVideoComment = async (id, commentid, user) => {
    const video = await VideoModel.get(id)
    return await video.removeComment(commentid, user);
};

module.exports = {
    GetVideoComments,
    AddVideoComment,
    DeleteVideoComment
}