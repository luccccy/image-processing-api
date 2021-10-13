"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.readImage = exports.imageProcessing = void 0;
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var imageProcessing = function (req, res) {
    var filename = req.query.filename;
    var widthString = req.query.width;
    var heightString = req.query.height;
    var width, height;
    if (widthString) {
        width = parseInt(widthString);
    }
    if (heightString) {
        height = parseInt(heightString);
    }
    var filePath = 'src/images/' + filename + '.jpg';
    var savePath = 'src/thumb/' +
        filename +
        '_' +
        ("" + widthString) +
        '*' +
        ("" + heightString) +
        '_thumb.jpg';
    return new Promise(function (resolve, reject) {
        readImage(filePath)
            .then(function (data) {
            if (data instanceof Buffer) {
                resizeImage(data, width, height, savePath).then(function (data) {
                    if (data instanceof Error)
                        reject(data);
                    return resolve(data);
                });
            }
        })
            .catch(function (err) {
            console.log(err);
            res.send('oops...No such file or directory!');
        });
    });
};
exports.imageProcessing = imageProcessing;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function readImage(filePath) {
    return fs_1.promises.readFile(filePath);
}
exports.readImage = readImage;
function resizeImage(buffer, width, height, savePath) {
    return new Promise(function (resolve, reject) {
        return (0, sharp_1.default)(buffer)
            .resize(width, height)
            .toFile(savePath, function (err, info) {
            if (err)
                reject(err);
            return resolve(info);
        });
    });
}
exports.resizeImage = resizeImage;
