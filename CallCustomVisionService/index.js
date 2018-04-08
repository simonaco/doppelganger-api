const request = require('request');
const API_URL =
  'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/bbfb33b7-4e47-482c-b7b4-5a1a92f66180/image?iterationId=0d4497ac-d6b5-4987-8c66-b03c5358c59e';
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const options = {
    url: API_URL,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Prediction-Key': process.env.ACCESS_KEY
    },
    method: 'POST',
    body: req.body
  };
  request(options, (err, result) => {
    if (err) {
      context.log('Error' + err);
      context.done();
      return;
    } else {
      context.log(result.body);
      context.done();
    }
  });
};
