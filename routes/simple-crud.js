const router = require('express').Router();
const pg = require('pg');
const Client = pg.Client;

const pgCamelCaser = require('pg-camelcase').inject;
pgCamelCaser(pg);

router.get('/', (req, res) => {

  const client = new Client();
  client.connect()
    .then(() => client.query('SELECT * FROM person'))
    .then((result) => {
      res.render('simple-crud/index', {
        people: result.rows
      });
      client.end()
    })
    .catch((err) => console.log('oops', err) );

});

router.get('/create', (req, res) => {
  res.render('simple-crud/create');
});

router.post('/create', (req, res) => {

  const client = new Client();

  client.connect()
    .then(() => {
      return client.query('INSERT INTO person(first_name, last_name, age) VALUES($1, $2, $3)', [req.body.firstName, req.body.lastName, Number(req.body.age)])
    })
    .then((result) => {
      client.end()
      res.redirect('create');
    })
    .catch((err) => console.log(err))

});

router.post('/delete/:id', (req, res) => {
  const client = new Client();

  client.connect()
    .then(() => {
      return client.query('DELETE FROM person WHERE person_id = $1', [req.params.id])
    })
    .then(() => {
      client.end();
      res.redirect('/simple-crud');
    })
    .catch((err) => console.log(err));


});

router.get('/update/:id', (req, res) => {

  const client = new Client();
  client.connect()
    .then(() => {
      return client.query('SELECT * FROM person WHERE person_id = $1 limit 1', [req.params.id]);
    })
    .then((result) => {
      res.render('simple-crud/update', result.rows[0]);
      client.end()
    })
    .catch((err) => console.log('oops', err) );

});

router.post('/update/:id', (req, res) => {
  const client = new Client();
  client.connect()
    .then(() => {
      return client.query('UPDATE person SET first_name = $1, last_name = $2, age = $3 WHERE person_id = $4', [req.body.firstName, req.body.lastName, req.body.age, req.params.id]);
    })
    .then((result) => {
      client.end();
      res.redirect('/simple-crud/')
    })
    .catch((err) => console.log('oops', err));
});


module.exports = router;
