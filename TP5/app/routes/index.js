var express = require('express');
var axios = require('axios');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var jsonData = {
    "data": d
  }
  res.render('index', { title: 'Músicas', adicionais: jsonData });
});


module.exports = router;
