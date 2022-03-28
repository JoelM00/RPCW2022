var express = require('express');
var axios = require('axios');

var router = express.Router();


//Gets
router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/musicas")
      .then( response => {
        var lista = response.data
        var d = new Date().toISOString().substring(0, 16)
        var jsonData = {
          "data": d
        }
        res.render('musicas',{title: 'Músicas', musicas: lista, data: jsonData})
      }).catch(err => {
        res.render('error', { error: err });
      })
});

router.get('/inserir', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var jsonData = {
        "data": d,
    }
    res.render('inserir',{title: 'Inserir', adicionais: jsonData})
});

router.get('/:id', function(req, res, next) {
    axios.get("http://localhost:3000/musicas?id=" + req.params.id)
        .then( response => {
          var dados = response.data[0]
          var d = new Date().toISOString().substring(0, 16)
          var jsonData = {
              "data": d
          }
          res.render('musica',{title: `Música ${ req.params.id}`, musica: dados, data: jsonData})
        }).catch(err => {
          res.render('error', { error: err });
        })
});

// Posts
router.post('/', (req, res, next) => {
    axios.post("http://localhost:3000/musicas", {
        tit: req.body.titulo,
        musico: req.body.musico,
        prov: req.body.prov
    }).then( response => {
        res.writeHead(301, {'Location': 'http://localhost:4000/'})
        res.end()
      }).catch(err => {
        res.render('error', { error: err });
      })
});



module.exports = router;

  
  