//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

//start express application
const app = express();

//Reading Enviroment Variables
require('dotenv').config();

//Set the view engine to EJS
app.set('view engine', 'ejs');

// Set up our static path and bodyparser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//Create a session middleware with the given options.
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

//Initiaize passport to authenticate requests
app.use(passport.initialize());
app.use(passport.session());


//Connecting to local MongoDB on "mongodb://localhost:27017/YOUR_DB_NAME"
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Creating the userSchema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//Creating new MongooseModel to define User collection
const User = new mongoose.model("User", userSchema);


//Setting up passport-local with the correct options + CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//configure strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

//configure strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      facebookId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

//configure strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      githubId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

//Setting up the Home route + render the home page
app.get("/", function(req, res) {
  res.render("home");
});

// Authenticate Requests
app.get("/auth/google", passport.authenticate('google', {
  scope: ['profile']
}));
app.get("/auth/google/secrets",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });
// Authenticate Requests
app.get("/auth/facebook",
  passport.authenticate("facebook"));
app.get("/auth/facebook/secrets",
  passport.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });
// Authenticate Requests
app.get('/auth/github',
  passport.authenticate('github'));
app.get('/auth/github/secrets',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

//setting up the register page + render the register page
app.get("/register", function(req, res) {
  res.render("register");
});
//setting up the login page + render the login page
app.get("/login", function(req, res) {
  res.render("login");
});

//setting up the secrets page + render the secrets page
app.get("/secrets", function(req, res) {
  User.find({
    "secret": {
      $ne: null
    }
  }, function(err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", {
          userswithSecrets: foundUsers
        });
      }
    }
  });
});
//setting up the logout  page + render the logout page + redirect back to the home page
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

//setting up the submit page + render the submit page + redirect back to the login page
app.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

//Setting up our post function to grab the data
app.post("/submit", function(req, res) {
  const new_secret = req.body.secret;
  console.log(req.user.id);
  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = new_secret;
        foundUser.save(function() {
          res.redirect("/secrets");
        });
      }
    }
  });
});

//Setting up Post Function to grab data
app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

//Setting up Post Function to grab data
app.post("/login", function(req, res) {
  const new_username = req.body.username;
  const new_password = req.body.password;

  const user = new User({
    username: new_username,
    password: new_password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });

});

//Set up express server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
