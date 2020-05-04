const Twitter = require('twitter-lite');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function tweet(msg) {
  return client.post('/statuses/update', { status: msg });
}

module.exports = {
  tweet,
};
