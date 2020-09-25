const anime = require('../commands/anime');
//sanity  check test
const sum = require('../commands/anime');

// test('adds 2 + 2 to equal 4', () => {
//   expect(sum(2, 2)).toBe(4);
// });

test('there is no I in team', () => {
  expect(anime).not.toBeNull();
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
