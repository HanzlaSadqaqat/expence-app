const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { readdirSync } = require("fs");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://0.0.0.0:27017/ExpenseApp")
  .then(() => console.log("Connected to Mongo"))
  .catch((e) => console.log(e.message));

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  app.listen(8080, () => {
    console.log("listening to port:", PORT);
  });
};

server();
