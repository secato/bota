const axios = require('axios');

const baseURL = 'https://api.steampowered.com/';

const urls = {
  bySequence: `${baseURL}IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1`,
  matchHistory: `${baseURL}IDOTA2Match_570/GetMatchHistory/V001/`,
  matchDetails: `${baseURL}IDOTA2Match_570/GetMatchDetails/V001/`,
  heroesList: `${baseURL}IEconDOTA2_570/GetHeroes/v1`,
};

const options = {
  params: {
    key: process.env.STEAM_API_KEY,
  },
};

function getLatestMatch() {
  return new Promise((resolve, reject) => {
    options.params.matches_requested = 1;
    axios(urls.matchHistory, options)
      .then(({ data }) => resolve(data.result.matches[0]))
      .catch((err) => reject(err));
  });
}

function getMachesBySequence(
  start_at_match_seq_num = '',
  matches_requested = 100
) {
  return new Promise((resolve, reject) => {
    options.params.start_at_match_seq_num = start_at_match_seq_num;
    options.params.matches_requested = matches_requested;
    axios(urls.bySequence, options)
      .then(({ data }) => resolve(data.result))
      .catch((err) => reject(err));
  });
}

function getHeroes() {
  return new Promise((resolve, reject) => {
    options.params.language = 'english';

    axios(urls.heroesList, options)
      .then(({ data }) => resolve(data.result.heroes))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getMachesBySequence,
  getHeroes,
  getLatestMatch,
};
