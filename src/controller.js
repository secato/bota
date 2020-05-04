const api = require('./services/dotaApi');
const Hero = require('./model/Hero');
const Match = require('./model/Match');

/**
 * @returns {Hero[]}
 */
async function getHeroes() {
  const heroes = await api.getHeroes();
  return heroes.map((hero) => new Hero(hero));
}

async function getLastMatchSequence() {
  const latestMatch = await api.getLatestMatch();
  return latestMatch.match_seq_num;
}

/**
 *
 * @param {number} sequence
 * @returns {Match[]}
 */
async function getMatches(sequence) {
  const data = await api.getMachesBySequence(sequence);

  return data.matches
    .filter(({ duration }) => duration > 0)
    .map((element) => new Match(element));
}

/**
 *
 * @param {Match[]} matches
 * @param {Hero[]} heroes
 * @returns {Map<String, Number>}
 */
function mostUsedHeroes(matches, heroes) {
  let mapHeroes = new Map();
  let allHeroes = matches.reduce((a, m) => a.concat(m.heroes), []);

  const findHeroById = (id) => heroes.find((hero) => hero.id === id);

  allHeroes.forEach((heroId) => {
    let hero = findHeroById(heroId);
    if (mapHeroes.has(hero.name)) {
      mapHeroes.set(hero.name, mapHeroes.get(hero.name) + 1);
    } else {
      mapHeroes.set(hero.name, 1);
    }
  });

  const sortedMap = new Map(
    [...mapHeroes.entries()].sort((a, b) => b[1] - a[1])
  );

  return sortedMap;
}

/**
 *
 * @param {Match[]} matches
 * @returns {Object} wins
 * @returns {number} wins.radiant
 * @returns {number} wins.dire
 */
function winRate(matches) {
  let direWins;
  let radiantWins;

  radiantWins = matches.reduce((s, m) => (s += m.radiantWin | 0), 0);
  radiantWins = (radiantWins / matches.length) * 100;
  direWins = 100 - radiantWins;

  return {
    radiant: radiantWins,
    dire: direWins,
  };
}

/**
 *
 * @param {Match[]} matches
 * @returns {number} duration
 */
function averageMatchDuration(matches) {
  return matches.reduce((s, m) => (s += m.duration), 0) / matches.length;
}

async function fillMatches(sequence, max) {
  let matches = [];
  while (matches.length < max) {
    let partialMatches = await getMatches(sequence);
    matches.push(...partialMatches);
    sequence = partialMatches[partialMatches.length - 1].sequenceNumber + 1;

    if (partialMatches.length === 0) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  matches.splice(max);
  return matches;
}

module.exports = {
  getHeroes,
  getLastMatchSequence,
  getMatches,
  mostUsedHeroes,
  winRate,
  averageMatchDuration,
  fillMatches,
};
