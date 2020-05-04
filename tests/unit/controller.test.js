const controller = require('../../src/controller');
const Match = require('../../src/model/Match');
const Hero = require('../../src/model/Hero');

test('Win rate calc', () => {
  let matches = [
    new Match({ radiant_win: false, players: [] }),
    new Match({ radiant_win: false, players: [] }),
    new Match({ radiant_win: false, players: [] }),
    new Match({ radiant_win: true, players: [] }),
    new Match({ radiant_win: true, players: [] }),
  ];

  expect(controller.winRate(matches)).toEqual({ radiant: 40, dire: 60 });
  expect(controller.winRate([])).toEqual({ radiant: 0, dire: 0 });
});

test('Average match duration', () => {
  let matches = [];

  //generates 5 matches with random lengths
  for (let i = 0; i < 5; i++) {
    let length = Math.floor(Math.random() * 50) + 10;
    matches.push(new Match({ duration: length, players: [] }));
  }

  // calc length
  const sumLength = matches.reduce(
    (sum, current) => (sum += current.duration),
    0
  );
  const avg = sumLength / matches.length;

  // compare with the result of the function
  expect(controller.averageMatchDuration(matches)).toBe(avg);
});

test('Most used heroes', () => {
  let heroes = [
    new Hero({ id: 1, localized_name: 'Hero 1' }),
    new Hero({ id: 2, localized_name: 'Hero 2' }),
    new Hero({ id: 3, localized_name: 'Hero 3' }),
    new Hero({ id: 4, localized_name: 'Hero 4' }),
    new Hero({ id: 5, localized_name: 'Hero 5' }),
  ];
  let matches = [
    new Match({ radiant_win: false, players: [] }),
    new Match({ radiant_win: false, players: [] }),
    new Match({ radiant_win: false, players: [] }),
    new Match({ radiant_win: true, players: [] }),
    new Match({ radiant_win: true, players: [] }),
  ];

  matches[0].heroes = [1, 2, 3];
  matches[1].heroes = [1, 5, 3];
  matches[2].heroes = [5, 1, 2];
  matches[3].heroes = [1, 4, 2];
  matches[4].heroes = [1, 2, 4];

  const mostUsedHeroes = controller.mostUsedHeroes(matches, heroes);
  const iterator = mostUsedHeroes.entries();
  let entry = iterator.next();

  expect(mostUsedHeroes.get('Hero 1')).toBe(5);
  expect(mostUsedHeroes.get('Hero 2')).toBe(4);

  // check ordering
  expect(entry.value[0]).toBe('Hero 1');
  expect(entry.value[1]).toBe(5);

  entry = iterator.next();
  expect(entry.value[0]).toBe('Hero 2');
  expect(entry.value[1]).toBe(4);
});
