const request = require('request');
const API_URL =
  'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Training/projects/bbfb33b7-4e47-482c-b7b4-5a1a92f66180/images/url';

module.exports = function(context, myQueueItem) {
  context.log(
    'JavaScript queue trigger function processed work item',
    myQueueItem
  );
  const img = myQueueItem;
  const body = {
    TagIds: [img.tag],
    Urls: [img.url]
  };

  const options = {
    url: API_URL,
    headers: {
      'Training-key': process.env.TRAINING_API_KEY
    },
    method: 'POST',
    body: JSON.stringify({
      TagIds: [img.tag],
      Urls: [img.url]
    })
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
