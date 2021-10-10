import express from 'express';
import imageProcessing from './utilities/imageProcessing';

//import readImage from './utilities/readImage';

const app = express();
const port = 3000;

app.get('/api/images', (req, res) => {
  const filePath =
    __dirname +
    '/thumb/' +
    req.query.filename +
    '_' +
    req.query.width +
    '*' +
    req.query.height +
    '_thumb.jpg';
  imageProcessing(req, res).then(data => {
    if (data instanceof Error) {
      res.statusCode = 404;
      res.send(data);
    }
    res.sendFile(filePath);
  });
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
