const request = require('request');
const _ = require('lodash');
const BASE_URL = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Training/projects/${
  process.env.PROJECT_ID
}/`;

module.exports = function(context, myQueueItem) {
  request.get(
    {
      url: BASE_URL + 'tags',
      headers: {
        'Training-key': process.env.TRAINING_API_KEY
      }
    },
    (err, result) => {
      if (err) {
        context.log('Error' + err);
        context.done();
      } else {
        const body = JSON.parse(result.body);
        let tag = _.find(body.Tags, { Name: myQueueItem.name });

        if (!tag) {
          //TODO define tag
        } else {
          tagImage(tag);
        }
      }
    }
  );
};

function tagImage(tag) {
  const options = {
    url: BASE_URL + 'images/url',
    headers: {
      'Training-key': process.env.TRAINING_API_KEY
    },
    method: 'POST',
    body: JSON.stringify({
      TagIds: [tag.Id],
      Urls: [img.url]
    })
  };
  request(options, (err, result) => {
    if (err) {
      context.log('Error' + err);
      context.done();
    } else {
      context.log('Images tagged successfully');
      context.done();
    }
  });
}
