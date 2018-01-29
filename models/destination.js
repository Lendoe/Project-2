const destination = {};
const axios = require('axios');




destination.allDestination = (req, res, next) => {
  axios({
    method:'GET',
    url:'https://restcountries.eu/rest/v2/all'
  })
  .then(response => {
    res.locals.allPlaces = response.data;
    console.log(response.data.name)
    next();
  })
}


module.exports = destination;
