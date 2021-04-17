const path = require("path");
const express = require("express");
const routes = require("./controllers");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitnessTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});