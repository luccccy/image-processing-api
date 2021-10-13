import { promises as fsPromises } from 'fs';
import express from 'express';
import sharp from 'sharp';

export const imageProcessing = (
  req: express.Request,
  res: express.Response
): Promise<sharp.OutputInfo | Error> => {
  const filename = req.query.filename;
  const widthString = req.query.width;
  const heightString = req.query.height;
  let width: number, height: number;
  if (widthString) {
    width = parseInt(widthString as string);
  }
  if (heightString) {
    height = parseInt(heightString as string);
  }
  const filePath = 'src/images/' + filename + '.jpg';
  const savePath =
    'src/thumb/' +
    filename +
    '_' +
    `${widthString}` +
    '*' +
    `${heightString}` +
    '_thumb.jpg';
  return new Promise((resolve, reject) => {
    readImage(filePath)
      .then((data: Buffer | Error) => {
        if (data instanceof Buffer) {
          resizeImage(data, width, height, savePath).then(
            (data: sharp.OutputInfo | Error) => {
              if (data instanceof Error) reject(data);
              return resolve(data);
            }
          );
        }
      })
      .catch((err: Error) => {
        console.log(err);
        res.send('oops...No such file or directory!');
      });
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function readImage(filePath: string): Promise<Buffer | Error> {
  return fsPromises.readFile(filePath);
}

export function resizeImage(
  buffer: Buffer,
  width: number,
  height: number,
  savePath: string
): Promise<sharp.OutputInfo | Error> {
  return new Promise((resolve, reject) => {
    return sharp(buffer)
      .resize(width, height)
      .toFile(savePath, (err, info) => {
        if (err) reject(err);
        return resolve(info);
      });
  });
}
