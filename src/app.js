require('dotenv').config();
const data = require('./controller');
const twitter = require('./services/twitterApi');
const DailyReport = require('./services/report');

let MAX_MATCHES = process.env.MAX_MATCHES || 1000;

exports.handler = async () => {
  try {
    console.log('Getting data from API');
    const sequence = await data.getLastMatchSequence();
    const matches = await data.fillMatches(sequence, MAX_MATCHES);
    const heroes = await data.getHeroes();

    console.log('Generating statistics');
    const wins = data.winRate(matches);
    const mostUsedHeroes = data.mostUsedHeroes(matches, heroes);
    const avgMatchDuration = data.averageMatchDuration(matches);

    console.log('Generating daily report');
    const report = new DailyReport();
    report.setRadiantWins(wins.radiant);
    report.setDireWins(wins.dire);
    report.setAvgTime(avgMatchDuration);
    report.setMatchesCollected(matches.length);
    report.setMostUsedHeroes(mostUsedHeroes);

    console.log('Tweeting report');
    await twitter.tweet(report.generate());
    console.log('Done');
  } catch (error) {
    console.error(error);
  }
};

if (process.env.NODE_ENV === 'development') {
  MAX_MATCHES = 100;
  this.handler();
}
