const request = require('request');
const qs = require('querystring');
const decodeBase64Image = require('../shared/image-processing');
const API_URL = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/bbfb33b7-4e47-482c-b7b4-5a1a92f66180/image?iterationId=5e829964-f54e-44e3-be4f-7795c96f3025`;

module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const image = decodeBase64Image(context, req.body.data);

  const options = {
    url: API_URL,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Prediction-Key': process.env.ACCESS_KEY
    },
    method: 'POST',
    body: image.data
  };
  request(options, (err, result) => {
    if (err) {
      context.log('Error' + err);
      context.done();
    } else {
      const body = JSON.parse(result.body);
      const lookalike = body.Predictions[0].Tag;
      const probability = body.Predictions[0].Probability * 100;
      context.res = {
        body: { doppelganger: `You look ${probability}% like ${lookalike}` }
      };
      context.done();
    }
  });
};
