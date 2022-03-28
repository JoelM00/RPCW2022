var express = require('express');
var axios = require('axios');

var router = express.Router();


//Gets
router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/musicas")
        .then( response => {
            var lista = response.data
            var d = new Date().toISOString().substring(0, 16)
            dicionario = {}
            lista.forEach(m => {
                if (!dicionario[m.prov]) {
                    dicionario[m.prov] = []
                }
                dicionario[m.prov].push(m)
            })

            var jsonData = {
                "data": d,
                "dicionario": dicionario
            }
            res.render('provincias',{dados: jsonData})
        
        }).catch(err => {
            res.render('error', { error: err });
        })
});


router.get('/:id', function(req, res, next) {
    axios.get("http://localhost:3000/musicas?prov=" + req.params.id)
        .then( response => {
        var lista = response.data
        var d = new Date().toISOString().substring(0, 16)
        var jsonData = {
            "data": d,
            "id": req.params.id
        }

        res.render('provincia',{musicas: lista, adicionais: jsonData})
        }).catch(err => {
        res.render('error', { error: err });
        })
});


module.exports = router;

  
  