class DailyReport {
  /**
   * @param {number} percentageOfWins
   */
  setRadiantWins(percentageOfWins) {
    this._radiantWins = percentageOfWins.toFixed(2);
  }

  setDireWins(percentageOfWins) {
    this._direWins = percentageOfWins.toFixed(2);
  }

  /**
   * @param {number} seconds
   */
  setAvgTime(seconds) {
    this._avgTime = Math.round(seconds / 60);
  }

  setMatchesCollected(totalMatches) {
    this._matchesCollected = totalMatches;
  }

  setMostUsedHeroes(heroes) {
    this._heroes = Array.from(heroes).slice(0, 5);
  }

  generate() {
    return `
Daily report (${this._matchesCollected} matches collected)

𝗪𝗶𝗻𝘀
- 👿 ${this._direWins}% (dire)
- 😇 ${this._radiantWins}% (radiant)

𝗔𝘃𝗲𝗿𝗮𝗴𝗲 𝗺𝗮𝘁𝗰𝗵 𝗱𝘂𝗿𝗮𝘁𝗶𝗼𝗻
- 🕑 ${this._avgTime} minutes

𝗠𝗼𝘀𝘁 𝘂𝘀𝗲𝗱 𝗵𝗲𝗿𝗼𝗲𝘀
- ${this._heroes[0][0]}
- ${this._heroes[1][0]}
- ${this._heroes[2][0]}
- ${this._heroes[3][0]}
- ${this._heroes[4][0]}
`;
  }
}

module.exports = DailyReport;
