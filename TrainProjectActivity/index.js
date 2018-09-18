const axios = require('axios');
const URL = `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${
  process.env.PROJECT_ID
}/train`;
async function trainProject(context) {
  try {
    const response = await axios({
      url: URL,
      method: 'post',
      headers: {
        'Training-key': process.env.TRAINING_API_KEY
      }
    });
    return response;
  } catch (error) {
    context.log(`Error code: ${error.code} message: ${error.message}`);
    throw new Error(error.message);
  }
}
module.exports = async function(context, req) {
  context.log(`Training project with id ${process.env.PROJECT_ID}`);
  const response = await trainProject(context);
  context.done(null, response);
};
