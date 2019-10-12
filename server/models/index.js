const mongoose = require('mongoose');

const config = require("../config");
const Video = require("./video");
const Comment = require("./comment");

const connectString = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

if (process.env.NODE_ENV === "test") {
  var Mockgoose = require('mock-mongoose').Mockgoose;
  var mockgoose = new Mockgoose(mongoose);

  mockgoose.prepareStorage().then(() => {
    mongoose.connect(connectString, {
      useNewUrlParser: true
    });
  });
} else {
  mongoose.connect(connectString, {
    useNewUrlParser: true
  });

}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.info("DB connection successful!");
});

module.exports = {
  Video,
  Comment
}