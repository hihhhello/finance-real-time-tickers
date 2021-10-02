# Finance real time tickers

## :star: Implemented features
- possibility to switch on/off tickers by user
- possibility to specify interval time by user
- possibility to add/remove ticker from watching group
- additional visual effects to highlight positive or negative changes in the prices

## :exclamation: To be implemented features
- Ticker's graphs

## :hammer: Used technologies:

- React with hooks
- Redux (redux-toolkit)
- Socket.io
- SCSS modules
- [Testing Library](https://testing-library.com)

## Run server

1. Open a new bash shell
2. `cd server`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`

## Run application

1. Open a new bash shell
2. `cd client`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`

## Run the tests

1. Open a new bash shell
2. `cd client`
3. `npm run test` or `yarn test`

## :exclamation: If you are NOT using WI-FI
1. Open a new bash shell
2. open client\src\consts\url.js
3. comment line with `http://192.168.1.125:4000`
4. uncoment line with `http://localhost:4000`
