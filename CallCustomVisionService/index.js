const request = require('request');
const qs = require('querystring');
const API_URL =
  'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/bbfb33b7-4e47-482c-b7b4-5a1a92f66180/image?iterationId=0d4497ac-d6b5-4987-8c66-b03c5358c59e';

function decodeBase64Image(context, data) {
  var matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  var response = {};

  if (matches.length !== 3) {
    context.log('Error case');

    return;
  }

  response.type = matches[1];

  response.data = Buffer.from(matches[2], 'base64');

  return response;
}
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  let response = decodeBase64Image(context, req.body.data);

  const options = {
    url: API_URL,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Prediction-Key': process.env.ACCESS_KEY
    },
    method: 'POST',
    body: response.data
  };
  request(options, (err, result) => {
    if (err) {
      context.log('Error' + err);
      context.done();
      return;
    } else {
      context.log('Retrieved data successfully ' + result.body);
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result.body
      };
      context.done();
    }
  });
};
