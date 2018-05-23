const { promisify } = require('util');
const { send } = require('micro');
const uuid = require('node-uuid');
const mongoose = require('mongoose');
var fs = require('fs');
var zlib = require('zlib');
const AWS = require('aws-sdk');
const { Files } = require('schemas')(mongoose);
const authenticate = require('authenticate')(mongoose)

console.log(process.env.AWS_SECRET_ACCESS_KEY);

// const s3 = new AWS.S3({
//     params: { Bucket: 'git-for-env-files' }
//   })

//

// MONGO_URL=mongodb://root:t70VE%253vlzNS2u@ds151558.mlab.com:51558/mechmania
// AWS_SECRET_ACCESS_KEY=4IRESGNpDMrLn/fiZ4akHkVYNqzvtrHuVIcRT07Y
// AWS_ACCESS_KEY_ID=AKIAJYS3A4NHESJAGEAQ

AWS.config.update({
  accessKeyId: 'AKIAJYS3A4NHESJAGEAQ',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new AWS.S3({
  params: { Bucket: 'git-for-env-files' },
});

//

const upload = promisify(s3.upload.bind(s3));

mongoose.connect(process.env.MONGO_URL);
mongoose.Promise = global.Promise;

module.exports = authenticate( async (req, res) => {
  const urlParams = req.url.split('/');
  if (urlParams[1] === 'favicon.ico') {
    const statusCode = 400;
    const data = { error: 'Custom error message' };
    send(res, statusCode, data);
    return;
  }

  const name = 'test4';
  var body = fs.createReadStream('test.js');
  const scriptName = uuid.v4();
  const key = 'files/' + scriptName;
  var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
  const data = await upload(
    {
      Key: key,
      Body: body,
    },
    options
  );

  console.log('finished upload');

  await s3.getObject({Key: key}).createReadStream().pipe(process.stdout);
  // const file = await Files.findOne({ name }).exec();
  const statusCode = 200;
  const data2 = { message: 'Success' };

  send(res, statusCode, data2);
});
