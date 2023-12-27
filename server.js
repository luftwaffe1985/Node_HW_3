const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const home = "/";
const about = "/about";
const pathToFile = path.join(__dirname, "views.json");

app.get("/", function (req, res) {
  const numberOfViews = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
  numberOfViews.homeViews += 1;
  fs.writeFileSync(pathToFile, JSON.stringify(numberOfViews, null, 2));
  res.send(`<h1>Core page</h1>
  <p>Views count: ${numberOfViews.homeViews}</p>
  <a href=${about}>Link to page /about</a>`);
});

app.get("/about", function (req, res) {
  const numberOfViews = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
  numberOfViews.aboutViews += 1;
  fs.writeFileSync(pathToFile, JSON.stringify(numberOfViews, null, 2));
  res.send(`<h1>About page</h1>
      <p>Views count: ${numberOfViews.aboutViews}</p>
      <a href=${home}>Link to Main page /</a>`);
});

app.use(function (req, res, next) {
  res.status(404).send("The page does not exist!");
});

app.listen(3000, function () {
  console.log("Listens to port 3000");
});
