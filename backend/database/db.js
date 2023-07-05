const { default: mongoose } = require("mongoose");

async function database() {
  const mongoose = require("mongoose");

  return await new Promise((resolve, reject) => {
    const URI = process.env.APIKEY;
    mongoose
      .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        resolve("Connected Corectly");
      })
      .catch((error) => {
        reject("There's a mistake");
      });
  });
}

function closeDatabase() {
  mongoose
    .disconnect()
    .then(() => {
      console.log("Connection is closed properly");
    })
    .catch((err) => {
      console.log("Cannot close the connection");
    });
}

module.exports = { database, closeDatabase };
