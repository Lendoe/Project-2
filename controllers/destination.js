

const router = require("express").Router();
const destination = require("../models/destination.js");


// router.post("/", beers.create, (req, res, next) => {
//     res.json({ id: res.locals.newBeerId, body: req.body });
// });





router.get('/viewDestination', (req, res) => { 
  destination.all()
  .then((destinations) => {
    console.log(destinations);
    res.render("destination", {destinationData: destinations});
  })
  // 
});


router.get('/countryview',(req, res) =>{
  res.render("countryview");
});

router.get('/countryview/:countryname', destination.allDestination, (req, res, next)=>{
  res.render("chosenCountry", res.locals.allPlaces);
  console.log('here',res.locals.allPlaces);
});
// ajax call  

router.post('/countryview/:countryname', destination.create, (req, res) => {
  res.redirect('/viewDestination');
})



module.exports = router;