import { readImage, resizeImage } from '../utilities/imageProcessing';

describe('test function readImage', () => {
  it('should return error if file is not exist', () => {
    return readImage('src/images/jfor.jpg').catch(err => {
      expect(err).toBeInstanceOf(Error);
    });
  });

  it('should return defined data', async () => {
    const data = await readImage('src/images/fjord.jpg');
    expect(data).toBeDefined();
  });

  it('should return Buffer data', async () => {
    const data = await readImage('src/images/icelandwaterfall.jpg');
    expect(data).toBeInstanceOf(Buffer);
  });
});

describe('test function resizeImage', () => {
  it('should return defined infomation', async () => {
    const buffer = await readImage('src/images/fjord.jpg');
    const savePath =
      'src/thumb/' + 'fjord.jpg' + '_' + '200' + '*' + '300' + '_thumb.jpg';
    const data = resizeImage(buffer as Buffer, 200, 300, savePath);
    expect(data).toBeDefined();
  });

  it('should return a Promise', async () => {
    const buffer = await readImage('src/images/fjord.jpg');
    const savePath =
      'src/thumb/' + 'fjord.jpg' + '_' + '200' + '*' + '300' + '_thumb.jpg';
    const data = resizeImage(buffer as Buffer, 200, 300, savePath);
    expect(data).toBeInstanceOf(Promise);
  });

  it('should throw error if the filepath is wrong.', async () => {
    const buffer = await readImage('src/images/fjord.jpg');
    const savePath =
      '../thumb/' + 'fjord.jpg' + '_' + '200' + '*' + '300' + '_thumb.jpg';
    resizeImage(buffer as Buffer, 200, 300, savePath).then(err => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});
