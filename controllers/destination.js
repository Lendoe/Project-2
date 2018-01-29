

const router = require("express").Router();
const destination = require("../models/destination.js");

// router.get("/", (req, res, next) => {
//   const destinationData = [
//     { id: 1, title: 'Clean Car', description: 'not fun' },
//     { id: 2, title: 'Shave cat', description: 'why is that happening' },
//     { id: 3, title: 'make pasta', description: 'need food' }
//   ];
//   res.render("destination", { destinationData: destinationData });
// });




router.get('/viewDestination', destination.allDestination, (req, res) => {
  res.render("destination", {destinationData: res.locals.allPlaces});
});


router.get('/countryview',(req, res) =>{
  res.render("countryview");
});


module.exports = router;