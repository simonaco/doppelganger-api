const df = require('durable-functions');

module.exports = df(function*(context) {
  context.log('Starting chain sample');
  const output = [];
  const actor = context.df.getInput();
  if (!actor) {
    throw new Error('A actor name is required as an input.');
  }
  try {
    const images = yield context.df.callActivityAsync(
      'SearchBingActivity',
      actor.name
    );

    const tag = yield context.df.callActivityAsync(
      'GetTagActivity',
      actor.name
    );
    const createImages = yield context.df.callActivityAsync(
      'CreateImagesActivity',
      {
        id: tag.id,
        urls: images
      }
    );
    const trainProject = yield context.df.callActivityAsync(
      'TrainProjectActivity',
      actor.name
    );
  } catch (error) {
    context.log(error);
  }

  return output;
});
