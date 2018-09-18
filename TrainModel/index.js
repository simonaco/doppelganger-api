const df = require('durable-functions');

module.exports = df(function*(context) {
  context.log('Starting chain sample');
  const output = [];
  const actor = 'Gandalf';
  try {
    const images = yield context.df.callActivityAsync(
      'SearchBingActivity',
      actor
    );

    const tag = yield context.df.callActivityAsync('GetTagActivity', actor);
    const createImages = yield context.df.callActivityAsync(
      'CreateImagesActivity',
      {
        id: tag.id,
        urls: images
      }
    );
    const trainProject = yield context.df.callActivityAsync(
      'TrainProjectActivity',
      actor
    );
  } catch (error) {
    context.log(error);
  }

  return output;
});
