const mongoose = require("mongoose");
const CommentSchema = require("./comment");

const process = require("../utils/video-processor");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const VideoSchema = new Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        default: new ObjectId()
    },
    file: Buffer,
    name: String,
    creatorName: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: [CommentSchema]
}, {
    versionKey: false
});

/**
 * Methods
 */
VideoSchema.methods = {
    /**
     * Add comment
     *
     * @param {String} user
     * @param {String} comment
     * @api private
     */

    addComment: function (user, comment) {
        this.comments.push({
            content: comment,
            creatorName: user
        });
        this.save();
        return this.comments.slice(-1).pop();
    },

    /**
     * Remove comment
     *
     * @param {ObjectId} _id
     * @param {String} user
     * @api private
     */

    removeComment: function (_id, user) {
        const index = this.comments
            .map(comment => comment._id)
            .indexOf(_id);

        if (~index && this.comments[index].creatorName === user) {
            this.comments.splice(index, 1);
            return this.save();
        }

    },

    /**
     * List comments for video
     *
     * @param {Object} options
     * @api private
     */

    listComments: function (options = {}) {
        const page = parseInt(options.page) || 0;
        const limit = parseInt(options.limit) || 30;
        return this.comments
            .slice(page * limit, (page + 1) * limit);
    },

    /**
     * Find comment by _id for video
     *
     * @param {ObjectId} _id
     * @api private
     */
    getComment: function (_id) {
        return this.comments
            .find(x => x._id = _id)
    },
};


/**
 * Statics
 */

VideoSchema.statics = {
    /**
     * Find video by _id
     *
     * @param {ObjectId} _id
     * @api private
     */

    get: function (_id) {
        return this.findOne({
                _id
            })
            .exec();
    },

    /**
     * Delete video by _id
     *
     * @param {ObjectId} _id
     * @param {String} user
     * @api private
     */

    delete: function (_id, user) {
        return this.deleteOne({
                _id,
                creatorName: user
            })
            .exec();
    },

    /**
     * List videos
     *
     * @param {Object} options
     * @api private
     */

    list: function (options = {}) {
        const criteria = options.criteria;
        const page = parseInt(options.page) || 0;
        const limit = parseInt(options.limit) || 30;
        return this.find(criteria)
            .sort({
                createdAt: -1
            })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};


module.exports = mongoose.model("Video", VideoSchema);