const request = require('request');
const qs = require('querystring');
const decodeBase64Image = require('../shared/image-processing');
const API_URL = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/${
  process.env.PROJECT_ID
}/image?iterationId=81402b55-5b2c-40b9-a316-66709886038c`;

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
