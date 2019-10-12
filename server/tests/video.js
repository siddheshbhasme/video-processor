
process.env.NODE_ENV = 'test'
// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("Videos /api/v1/videos", () => {
    let videoId = "";
    let commentId = "";
    it("should upload a videos", (done) => {
        chai.request(app)
            .post('/api/v1/videos')
            .attach('video', './server/tests/test.mp4', 'test.mp4')
            .type('form')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                videoId = res.body.data.id;
                done();
            });
    });

    it("should get all videos", (done) => {
        chai.request(app)
            .get('/api/v1/videos')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it("should get a video by ID", (done) => {
        chai.request(app)
            .get(`/api/v1/videos/${videoId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.header('content-type');
                res.header['content-type'].should.be.equal('video/mp4');
                done();
            });
    });

    it("should add comment", (done) => {
        chai.request(app)
            .post(`/api/v1/videos/${videoId}/comments`)
            .send({ comment: 'Test Comment'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                commentId = res.body.data._id;
                done();
            });
    });

    it("should get all comments for a video", (done) => {
        chai.request(app)
            .get(`/api/v1/videos/${videoId}/comments`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it("should delete a comment", (done) => {
        chai.request(app)
            .delete(`/api/v1/videos/${videoId}/comments/${commentId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should return error if we try to delete wrong comment id", (done) => {
        chai.request(app)
        .delete(`/api/v1/videos/${videoId}/comments/${commentId}`)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });

    it("should delete a video", (done) => {
        chai.request(app)
            .delete(`/api/v1/videos/${videoId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it("should return error if we try to delete wrong video id", (done) => {
        chai.request(app)
            .delete(`/api/v1/videos/${videoId}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});