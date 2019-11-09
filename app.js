const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
TOKEN = config.token;
const request = require('./request');
const config = require('./config');
var https = require('https');
const fs = require('fs');

app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://public-api.wordpress.com/oauth2/authorize',
    tokenURL: 'https://public-api.wordpress.com/oauth2/token',
    clientID: config.ClientId,
    clientSecret: config.ClientSecret,
    callbackURL: config.callbackUrl,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('Golololol', accessToken, refreshToken, profile);
    TOKEN = accessToken;
    cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/auth/example', passport.authenticate('oauth2'));
 
app.get('/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});


app.post('/fullfill', (req, res)=>{
    console.log(req.body.queryResult.parameters);
    request.getStats(req.body.queryResult.parameters, (err, response)=>{
	console.log('response', response);
        res.json(response);
    })
});


https.createServer({
key: fs.readFileSync('server.key'),
cert: fs.readFileSync('server.cert')
}, app)
.listen(config.PORT, function () {
console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})
