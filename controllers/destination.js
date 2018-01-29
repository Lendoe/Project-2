

const router = require("express").Router();

router.get("/", (req, res, next) => {
  const destinationData = [
    { id: 1, title: 'Clean Car', description: 'not fun' },
    { id: 2, title: 'Shave cat', description: 'why is that happening' },
    { id: 3, title: 'make pasta', description: 'need food' }
  ];
  res.render("destination", { destinationData: destinationData });
});





module.exports = router;