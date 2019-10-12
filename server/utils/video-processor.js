const ffmpeg = require("fluent-ffmpeg");
const mkdirp = require("mkdirp");
const fs = require("fs");

const processVideo = (item) => {
    const targetFolder = `processed/${item.creatorName}`
    const targetFile = `${targetFolder}/${item.name}`
    const sourceFile = `uploads/${item.creatorName}/${item.name}`
    mkdirp(targetFolder, (err) => {
        if (err) {
            console.error('Cannot process video: as not able to create destination folder');
        }

        ffmpeg(sourceFile)
            .on('start', (commandLine) => {
                console.log('Spawned Ffmpeg with command: ' + commandLine);
            })
            .on('progress', (progress) => {
                console.log('Processing: ' + progress.percent + '% done');
            })
            .on('end', (stdout, stderr) => {
                console.log('Transcoding succeeded !');
            })
            .on('error', (err, stdout, stderr) => {
                console.error('Cannot process video: ' + err.message);
            })
            .format('mp4')
            .size('640x640')
            .output(targetFile)
            .run();
    })
}

module.exports = processVideo;