'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const pug = require('pug');
const passport = require('passport');
const expressSession = require('express-session');

const app = express();

//use pug
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

//For FCC testing purposes
fccTesting(app);
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
	res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'});
});

app.use(session({
  	secret: process.env.SESSION_SECRET,
  	resave: true,
  	saveUninitialized: true,
}));

//authorize passport
 app.use(passport.initialize());
 app.use(passport.session());

 passport.serializeUser((user, done) => {
   done(null, user._id);
 });

 passport.deserializeUser((id, done) => {
        db.collection('users').findOne(
            {_id: new ObjectID(id)},
            (err, doc) => {
                done(null, doc);
            }
        );
    });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
