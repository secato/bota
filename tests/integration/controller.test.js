const controller = require('../../src/controller');
const dotaApi = require('../../src/services/dotaApi');
const Hero = require('../../src/model/Hero');
const Match = require('../../src/model/Match');

jest.mock('../../src/services/dotaApi');

test('Get heroes', async () => {
  dotaApi.getHeroes.mockResolvedValue([
    { id: 1, localized_name: 'Anti-Mage' },
    { id: 2, localized_name: 'Axe' },
    { id: 3, localized_name: 'Bane' },
  ]);

  const heroes = await controller.getHeroes();

  expect(heroes).toHaveLength(3);

  heroes.forEach((hero) => {
    expect(hero).toBeInstanceOf(Hero);
  });

  expect(heroes[0].name).toBe('Anti-Mage');
  expect(heroes[2].name).toBe('Bane');
});

test('Get last match sequence', async () => {
  dotaApi.getLatestMatch.mockResolvedValue({ match_seq_num: 123 });
  const sequence = await controller.getLastMatchSequence();
  expect(sequence).toBe(123);
});

test('Get matches', async () => {
  dotaApi.getMachesBySequence.mockResolvedValue({
    matches: [
      {
        match_id: 1,
        match_seq_num: 100,
        duration: 12,
        radiant_win: false,
        players: [],
      },
      {
        match_id: 2,
        match_seq_num: 101,
        duration: 0,
        radiant_win: false,
        players: [],
      },
      {
        match_id: 1,
        match_seq_num: 102,
        duration: 25,
        radiant_win: true,
        players: [],
      },
    ],
  });

  const matches = await controller.getMatches();

  // match with duration equals to zero is filtered
  expect(matches).toHaveLength(2);

  matches.forEach((match) => {
    expect(match).toBeInstanceOf(Match);
  });
});
