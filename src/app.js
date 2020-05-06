require('dotenv').config();
const controller = require('./controller');
const twitter = require('./services/twitterApi');
const DailyReport = require('./services/report');

exports.handler = async (event, context, callback) => {
  const report = await makeReport();
  const tweet = await twitter.tweet(report.generate());
  return tweet;
};

async function makeReport() {
  console.log('Getting data from API');
  const sequence = await controller.getLastMatchSequence();
  const matches = await controller.fillMatches(sequence);
  const heroes = await controller.getHeroes();

  console.log('Generating statistics');
  const wins = controller.winRate(matches);
  const mostUsedHeroes = controller.mostUsedHeroes(matches, heroes);
  const avgMatchDuration = controller.averageMatchDuration(matches);

  console.log('Generating daily report');
  const report = new DailyReport();
  report.setRadiantWins(wins.radiant);
  report.setDireWins(wins.dire);
  report.setAvgTime(avgMatchDuration);
  report.setMatchesCollected(matches.length);
  report.setMostUsedHeroes(mostUsedHeroes);

  return report;
}

// allows to run locally
if (process.env.NODE_ENV === 'development') {
  process.env.MAX_MATCHES = 100;
  makeReport()
    .then((report) => {
      console.log(report.generate());
    })
    .catch((error) => {
      console.error(error);
    });
}
