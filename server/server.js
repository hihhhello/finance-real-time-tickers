"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const users = {};

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

// for more realistic tickers update
function getRandomTickers(tickers) {
  const shuffled = tickers.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, randomValue(0, tickers.length));
}

function getQuotes(socket, watchingTickers, getRand = false) {
  let currTickers = [
    ...tickers.filter((ticker) => watchingTickers.includes(ticker)),
  ]; // filtering tickers by watchingTickers
  if (getRand) {
    currTickers = getRandomTickers(watchingTickers);
  }
  const quotes = currTickers.map((ticker) => {
    const change = randomValue(-200, 200, 2);

    return {
      ticker,
      exchange: "NASDAQ",
      price: randomValue(100, 300, 2),
      change,
      change_percent:
        change > 0
          ? randomValue(0, 1, 2)
          : change < 0
          ? randomValue(-1, 0, 2)
          : 0,
      dividend: randomValue(0, 1, 2),
      yield: randomValue(0, 2, 2),
      last_trade_time: utcDate(),
    };
  });
  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  const { watchingTickers, updateInterval } = users[socket.id];
  /*
  userSettings: updateInterval, watchingTickers
  */
  getQuotes(socket, watchingTickers); // filter then by watching tickers
  // every N seconds
  users[socket.id].timer = setInterval(function () {
    getQuotes(socket, watchingTickers, true);
  }, updateInterval);

  socket.on("stop", () => {
    users[socket.id].isWatching = false;
    clearInterval(users[socket.id].timer);
  });
}

function setNewInterval(socket, value) {
  const { watchingTickers, timer, isWatching } = users[socket.id];
  users[socket.id].updateInterval = value;
  clearInterval(timer);
  if (isWatching && watchingTickers.length) {
    users[socket.id].timer = setInterval(function () {
      getQuotes(socket, watchingTickers, true);
    }, value);
  }
}

function updateWatchingTickers(socket, newWatchingTickers) {
  const { timer, updateInterval, isWatching } = users[socket.id];
  clearInterval(timer);
  users[socket.id].watchingTickers = [...newWatchingTickers];
  if (isWatching && newWatchingTickers.length) {
    users[socket.id].timer = setInterval(function () {
      getQuotes(socket, newWatchingTickers, true);
    }, updateInterval);
  }
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.redirect("http://localhost:3000/");
});

socketServer.on("connection", (socket) => {
  socket.on("create user", (userSettings) => {
    users[socket.id] = { ...userSettings };
  });

  socket.on("start", () => {
    if (users[socket.id]) {
      users[socket.id].isWatching = true;
      trackTickers(socket);
    }
  });
  socket.on("update-interval", (value) => {
    setNewInterval(socket, value);
  });
  socket.on("update-watching-tickers", (watchingTickers) => {
    updateWatchingTickers(socket, watchingTickers);
  });

  socket.on("disconnect", function () {
    if (users[socket.id]) {
      clearInterval(users[socket.id].timer);
      delete users[socket.id];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
