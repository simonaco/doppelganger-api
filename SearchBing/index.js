const request = require('request');
module.exports = function(context, myQueueItem) {
  const options = {
    url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search',
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
    } else {
      const body = JSON.parse(result.body);
      context.bindings.outputQueueItem = body.value.map(element => {
        return {
          name: myQueueItem,
          url: element.contentUrl
        };
      });
      context.done();
    }
  });
};
