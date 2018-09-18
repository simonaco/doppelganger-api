const axios = require('axios');
const URL = `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${
  process.env.PROJECT_ID
}/images/urls`;
async function createImages(context) {
  context.log(`Creating images for tag ${context.bindings.images.id}`);
  const urls = context.bindings.images.urls.map(image => {
    return {
      url: image.contentUrl
    };
  });
  try {
    const response = await axios({
      url: URL,
      method: 'post',
      headers: {
        'Training-key': process.env.TRAINING_API_KEY
      },
      data: {
        tagIds: [context.bindings.images.id],
        images: urls
      }
    });
    return response;
  } catch (error) {
    context.log(`Error code: ${error.code} message: ${error.message}`);
    throw new Error(error.message);
  }
}
module.exports = async function(context, req) {
  const response = await createImages(context);
  context.done(null, response);
};
