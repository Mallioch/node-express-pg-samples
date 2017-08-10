const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

require('dotenv').config();

//console.log('process.env', process.env);

const app = express();

// static file handling
app.use(express.static('public'));

// setup mustache
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

// gotta catch all them post bodies
app.use(bodyParser.urlencoded({extended: true}));

app.use('/simple-crud', require('./routes/simple-crud'));

app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}.`);
});
