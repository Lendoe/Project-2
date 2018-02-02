

const router = require("express").Router();
const destination = require("../models/destination.js");
var moment = require('moment');


// router.post("/", beers.create, (req, res, next) => {
//     res.json({ id: res.locals.newBeerId, body: req.body });
// });


router.get("/", (req, res, next) =>{
  var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    res.render("countryview", {time:currentTime});
    // res.render("./users/login",{time:currentTime});
});


router.get('/viewDestination', (req, res) => { 
  destination.all()
  .then((destinations) => {
    res.render("destination", {destinationData: destinations});
  })
  
});


router.get('/countryview',(req, res) =>{
  res.render("countryview");
});

router.get('/countryview/:countryname', destination.allDestination, (req, res, next)=>{
  res.render("chosenCountry", res.locals.allPlaces);
});
// ajax call  

router.post('/countryview/:countryname', destination.create, (req, res) => {
  res.redirect('/viewDestination');
})

//Route for Deletion ----------------------------------------------------------------------------
router.get('/countryview/:countryname/:individualCountry', destination.showIndividualId, (req, res, next)=>{
 console.log("I'm working&****&&&&***", res.locals.individualId);

  res.render("users/individualCountry", {country: res.locals.individualId});
  
});

// delete request
// router.delete('/countryview/:countryname/:individualCountry', 
  // destination.deleteDestination, (req, res, next)=>{
    // res.json({req.params.individualId});
  // });


  router.delete("/countryview/:id", destination.destroy, (req, res, next)=>{
res.json({id:req.params.id});
  });

 

  router.put('/countryview/:countryname/:individualCountry', destination.update, (req, res, next)=>{
    res.json(res.locals.updatedDestination);
  });







// --------------------------------------------------------------------------

module.exports = router;






