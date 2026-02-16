const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./data/database");
const port = 3000;
const passport = require("passport");
const session = require("express-session");
const githubStrategy = require("passport-github2").Strategy;
const { getByUsername, createUserInternal } = require('./controllers/userController');

app.use(cors())
.use(bodyParser.json())
.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
)
.use(passport.initialize())
.use(passport.session())
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

passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
  return done(null, profile);
  //});
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  async (req, res) => {
    req.session.user = req.user;
    const username = req.user.username
    userDetails = await getByUsername(username);
    if (!userDetails) {
      createUserInternal({userName: username, isAdmin: "false"});
      userDetails = getByUsername(username);
      req.session.user.isAdmin = false;
    } else {
      req.session.user.isAdmin = Boolean(userDetails.isAdmin);
    }
    req.session.user.userId = userDetails._id;
    res.redirect('/');
});

app.use("/", require("./routes/index.js"));

app.get("/login", passport.authenticate('github'), (req, res) => {});

app.get('/logout', function(req, res, next) {
  req.logout(function (err){
    if (err) return next(err);
    res.redirect('/');
  });
});

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