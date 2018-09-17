const axios = require('axios');
const BASE_URL = `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${
  process.env.PROJECT_ID
}/tags`;

async function createTag(context) {
  try {
    const response = await axios({
      url: BASE_URL,
      method: 'post',
      headers: {
        'Training-key': process.env.TRAINING_API_KEY
      },
      params: {
        name: context.bindings.name
      }
    });
    context.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
async function getTag(context) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'Training-key': process.env.TRAINING_API_KEY
      }
    });
    let tag = _.find(response.data, { name: context.bindings.name });

    if (!tag) {
      tag = await createTag(context);
    }
    return tag;
  } catch (error) {
    context.log(`Error code: ${error.code} message: ${error.message}`);
    throw new Error(error.message);
  }
}
module.exports = async function(context) {
  const tag = await getTag(context);
  context.done(null, tag);
};
