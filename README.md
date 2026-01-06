<a href="https://gungi.io"><p align="center">
<img height=350 src="https://www.gungi.io/images/og-image.png"/>
</p></a>
<p align="center">
  <strong>Online real-time website to play Gungi from Hunter × Hunter ⚡</strong>
</p>

---

> [!IMPORTANT]  
> **This repository is a legacy snapshot of the original Gungi.io codebase.**  
> The new [gungi.io](https://gungi.io) has been rebuilt from the ground up.  
> This repo now serves as an **issue tracker** for the new platform — [report bugs or request features](../../issues).

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
 
