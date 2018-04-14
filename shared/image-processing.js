module.exports = function(context, data) {
  var matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  var response = {};

  if (matches.length !== 3) {
    context.log('Error case');

    return;
  }

  response.type = matches[1];

  response.data = Buffer.from(matches[2], 'base64');

  return response;
};
