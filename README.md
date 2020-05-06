# Bota

**`Bota`** is a bot that automatically tweets latest Dota matches statistics.

You can check the twitter profile [@LittleBota](https://twitter.com/LittleBota)

This was developed for CS50 course final project and the main goal was to explore the complete process from development to continuous deployment.

## Stack

- Node.js
- Jest (test framework)
- Dota API
- Tweet API
- Github actions (for automated test and deployment)
- AWS Lambda

## About

The process in short is:

- Once a day AWS triggers this lambda function
- The function collects the latest `MAX_MATCHES` using Dota 2 Web API
- Then it calculates several metrics
- After that tweets the results in the official tweet account

The deployment is handled with Github actions and only occurs if the test runs successful.

## Running locally

You can run this code locally, the only requirement is to fill the steam api key environment variable, you can generate a key [here](http://steamcommunity.com/dev/apikeyhttp://steamcommunity.com/dev/apikey).

After cloning and installing the dependencies just run:
`npm run dev`, and you should see something like:

```
Daily report (100 matches collected)

𝗪𝗶𝗻𝘀
- 👿 41.00% (dire)
- 😇 59.00% (radiant)

𝗔𝘃𝗲𝗿𝗮𝗴𝗲 𝗺𝗮𝘁𝗰𝗵 𝗱𝘂𝗿𝗮𝘁𝗶𝗼𝗻
- 🕑 39 minutes

𝗠𝗼𝘀𝘁 𝘂𝘀𝗲𝗱 𝗵𝗲𝗿𝗼𝗲𝘀
- Pudge
- Ogre Magi
- Phantom Assassin
- Sniper
- Lion
```

**In development mode it will collect only the latest 100 matches.**
