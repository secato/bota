class Match {
  constructor(match) {
    this.id = match.match_id;
    this.sequenceNumber = match.match_seq_num;
    this.radiantWin = match.radiant_win;
    this.duration = match.duration;
    this.heroes = match.players.map(({ hero_id }) => hero_id);
  }
}

module.exports = Match;
