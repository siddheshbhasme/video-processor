const multer = require('multer');
const mkdirp = require('mkdirp');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var path = `${config.uploadDir}/${req.user}`;
        mkdirp(path, (err) => {
            if (!err) {
                cb(null, path);
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const index = config.supportedFormats.indexOf(file.mimetype);
        cb(null, ~index);
    }
})

module.exports = upload;