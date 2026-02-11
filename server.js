const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./data/database");
const port = 3000;

app.use(cors())
.use(bodyParser.json())
.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
);
next();
})
.use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"] }))
.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/", require("./routes/index.js"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log(
        "Database listening, Node running on port " +
          (process.env.PORT || port),
      );
    });
  }
});