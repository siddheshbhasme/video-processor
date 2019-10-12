const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const CommentSchema = new Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        default: new ObjectId()
    },
    content: String,
    creatorName: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {
    versionKey: false
});

module.exports = CommentSchema