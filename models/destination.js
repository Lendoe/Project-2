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


// delete model
destination.showIndividualId = (req, res, next)=>{
  db
    .one('SELECT * FROM destination WHERE id = $1',
      [req.params.individualCountry])
    .then(data =>{
      res.locals.individualId = data;
      next();
    })
    .catch(err => {
      console.log("there has been an error in individualCountry");
      next(err);
          });
}


// destination.deleteDestination = (req, res, next)=>{
//   db
//   .none ('DELETE FROM destination WHERE individualId = $1',[req.params.individualId])
//   .then(()=>{
//     next();

//   }) 

// }

// ----------------------------------------------------------
destination.destroy = (req, res, next) => {
 
  console.log("In destination.destroyByUserAndName.");
  db
    .none("DELETE FROM destination WHERE id = $1" , [
      req.params.id
      
    ])
    .then(() => {
      next();
    })
    .catch(err => {
      console.log(
        "Error encountered.destroy. error:",
        err
      );
      next(err);
    });
};


// // this gets used in the PUT method in controllers/users.js
destination.update = (req, res, next) => {
  const id = req.params.individualCountry;
  const visited = req.body.visited ? true:false;
   db
    .one(
      "UPDATE destination SET visited = $1  WHERE id = $2 RETURNING *;",
      [visited, id]
    )
    .then(data => {
      res.locals.updatedDestination = data;
      next();
    })
    .catch(err => {
      console.log(
        "Error encountered.error:",
        err
      );
      next(err);
    });
};













module.exports = destination;
// https://restcountries.eu/rest/v2/all