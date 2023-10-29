const express = require("express");
const app = express();
const path = require("path");

app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware");
  next();
});

app.get("/", (req, res, next) => {
  let file = path.join(__dirname, "index.html");
  res.sendFile(file, (error) => {
    if (error) next(error);
  });
});

app.use((req, res, next) => {
  res.status(404).send('<h2 style="color : red;">Untreacable page!</h2>');
});

app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500).send('<h2 style="color : red;">WTF is this error!</h2>');
});
app.listen(3001);
