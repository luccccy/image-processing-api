"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcessing_1 = require("./utilities/imageProcessing");
var app = (0, express_1.default)();
var port = 8080;
app.get('/api/images', function (req, res) {
    var filePath = __dirname +
        '/thumb/' +
        req.query.filename +
        '_' +
        req.query.width +
        '*' +
        req.query.height +
        '_thumb.jpg';
    (0, imageProcessing_1.imageProcessing)(req, res).then(function (data) {
        if (data instanceof Error) {
            res.statusCode = 404;
            res.send(data);
        }
        res.sendFile(filePath);
    });
});
app.listen(port, function () {
    console.log("server started at localhost:" + port);
});
exports.default = app;
