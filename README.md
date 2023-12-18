<a href="https://gungi.io"><p align="center">
<img height=100 src="client/src/assets/gungi-github.svg?raw=true"/>
</p></a>
<p align="center">
  <strong>Online real-time website to play Gungi from Hunter × Hunter ⚡</strong>
</p>
<p align="center">
 
  <a href="https://gungi.io">
    <img src="https://img.shields.io/endpoint?color=9045d6&style=for-the-badge&url=https%3A%2F%2Fapi.gungi.io%2Fshields" alt="gungi - active games" />
  </a>
</p>

---

## WARNING
This project is no longer actively maintained so the site might be down whenever I run out of free credits. When I get time in the future I would love to revisit the project and make it even better! Thanks for your understanding :)

## Structure

| Codebase              |      Description          |
| :-------------------- | :-----------------------: |
| [client](client)       | Create React App Frontend |
| [server](server)    | Nodejs API with Socket.io |
| [gungi.js](https://github.com/jwyce/gungi.js)    | Library for game logic |


## Branches

- staging -> pr this branch for everything
- master -> don't touch, this is what's running in production

## Why did you make this?
This game appears in the manga/anime Hunter × Hunter, and seemed really interesting and looked like it had a ton of complexity and depth to play around in. 

So, inspired by this [reddit post](https://www.reddit.com/r/HunterXHunter/comments/6803yz/revised_rules_of_gungi_in_hunterxhunter_pdf/) which spelled out a complete ruleset, I set out to make it a reality and accessible for anyone to play and explore. 

An additional side benefit in making this was to use it as a learning opportunity to familiarize myself with some of the latest popular web technologies, and this is the first project of more to come!

## How to run locally
* Fork the repository
* Navigate to `/server`
* Run `yarn`
* Add `.env` file with the following environment variables
  * `PORT=4000`
  * `CORS_ORIGIN=http://localhost:3000`
* Run `yarn watch && yarn dev`
* Navigate to `/client`
* Run `yarn`
* Add `.env` file with the following environment variables
  * `REACT_APP_API_URL=http://localhost:4000`
  * `REACT_APP_PUBLIC_URL=http://localhost:3000`
* Run `yarn start`
 
