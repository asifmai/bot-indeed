var express = require('express');
var router = express.Router();
const scrapeIndeed = require('../helpers/scrapeindeed');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/scrape', async function(req, res, next) {
  scrapeIndeed().then(data => {
    res.status(200).json({results: data})
  });
});

module.exports = router;
