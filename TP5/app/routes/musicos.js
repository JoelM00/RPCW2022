var express = require('express');
var axios = require('axios');

var router = express.Router();


//Gets
router.get('/', function(req, res, next) {
    console.log("aifndfsgdfghdsfgh")
    axios.get("http://localhost:3000/musicas")
        .then( response => {
            var lista = response.data
            var d = new Date().toISOString().substring(0, 16)
            dicionario = {}
            lista.forEach(m => {
                if (!dicionario[m.musico]) {
                    dicionario[m.musico] = []
                }
                dicionario[m.musico].push(m)
            })
         
            var jsonData = {
                "data": d,
            }
            res.render('musicos',{musicos: dicionario, adicionais: jsonData})
        }).catch(err => {
            res.render('error', { error: err });
        })
});


router.get('/:id', function(req, res, next) {
    axios.get("http://localhost:3000/musicas?musico=" + req.params.id)
        .then( response => {
            var lista = response.data
            var d = new Date().toISOString().substring(0, 16)
            var jsonData = {
                "data": d,
                "id": req.params.id
            }
            res.render('musico',{musicas: lista, adicionais: jsonData})
        }).catch(err => {
            res.render('error', { error: err });
        })
});


module.exports = router;

  
  