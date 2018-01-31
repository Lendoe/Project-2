const destination = {};
const axios = require('axios');
const db = require('../db/index.js');

destination.all = () => {
  return db.query(
    'SELECT * FROM destination;'
  )
}

destination.create = (req, res, next) => {
  console.log(req.body)
  db.oneOrNone(
    'INSERT INTO destination (name, population, capital, flag_url) VALUES ($1, $2, $3, $4) RETURNING *;', [req.body.name, req.body.population, req.body.capital, req.body.flag_url]
  )
  next();
}

destination.allDestination = (req, res, next) => {
  const countryName = req.params.countryname
  axios({
    method:'GET',
    url:`https://restcountries.eu/rest/v2/name/${countryName}`
  })
  .then(response => {
    res.locals.allPlaces = response.data[0];
    console.log('_______',response.data[0])
    next();
  })
}


module.exports = destination;
// https://restcountries.eu/rest/v2/all