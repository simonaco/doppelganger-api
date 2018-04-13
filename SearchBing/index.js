const request = require('request');
const API_URL = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';

module.exports = function(context, myQueueItem) {
  context.log(
    'JavaScript queue trigger function processed work item',
    myQueueItem
  );
  const options = {
    url: API_URL,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    },
    method: 'GET',
    qs: {
      q: myQueueItem,
      imageType: 'photo'
    }
  };
  request(options, (err, result) => {
    if (err) {
      context.log('Error' + err);
      context.done();
      return;
    } else {
      context.log('Retrieved data successfully ' + result.body);
      const body = JSON.parse(result.body);
      var queueMessages = _.map(body.value, element => {
        return {
          tag: myQueueItem,
          url: element.contentUrl
        };
      });
      context.bindings.outputQueueItem = queueMessages;
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result.body
      };
      context.done();
    }
  });
};
