const axios = require('axios');
const URL = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';
async function getImages(context) {
  try {
    const response = await axios.get(URL, {
      params: {
        q: context.bindings.name,
        imageType: 'photo'
      },
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
      }
    });
    return response.data.value;
  } catch (error) {
    context.log(`Error code: ${error.code} message: ${error.message}`);
    throw new Error(error.message);
  }
}
module.exports = async function(context) {
  context.log(`Hello ${context.bindings.name}!`);
  const images = await getImages(context);
  context.done(null, images);
};
