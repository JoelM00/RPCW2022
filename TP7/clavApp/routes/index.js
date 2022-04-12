var express = require('express');
var axios = require('axios')
var router = express.Router();

const key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ'

//Tentativa de ir buscar a key
//router.get('/',(req,res,next) => {
//  credenciais = {
//    username: "pri2020@teste.uminho.pt",
//    password: "123"
//  }  
//  axios.post('http://clav-api.di.uminho.pt/v2/users/login',credenciais)
//    .then(resp => {
//      key = resp.body
//      res.status(200).jsonp(resp)
//    }).catch(err => {
//      res.status(500).jsonp(err)
//    })
//})

router.get('/',(req,res,next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&apikey='+key)
    .then(resp => {
      dados = {
        titulo: "Pagina inicial",
        contexto: "Pagina que contem a lista de classes de nivel 1",
      }
      dados['lista'] = resp.data
      res.render('index',dados)
    }).catch(err => {
      res.status(500).jsonp(err)
    })
})

router.get('/:id',(req,res,next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+req.params.id+'?apikey='+key)
    .then(resp => {
      console.log(resp.data)
      res.render('classe',resp.data)
    }).catch(err => {
      res.status(500).jsonp(err)
    })
})


router.get('/queries/q1', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=3&apikey='+key)
    .then(dados => {
      total = 0
      pertencentes = []
      dados.data.forEach(p => {
        partes = p.codigo.split('.')
        if (partes[0] == '750') {
          total += 1
          pertencentes.push(p)
        }
      })
      res.render('querie', { title: 'Querie 1', resultado: "Total de processos pertencentes à descendencia da classe 750: "+total, dados: pertencentes});
    })
    .catch(err => {
      console.log(err)
    }) 
});

router.get('/queries/q2',(req,res,next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=4&apikey='+key)
    .then(dados => {
      total = dados.data.length
      res.render('querie', { title: 'Querie 2', resultado: "Total de subprocessos: "+total, dados: dados.data});
    })
    .catch(err => {
      console.log(err)
    }) 
})

router.get('/queries/q3',(req,res,next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c750.30/descendencia?apikey='+key)
    .then(dados => {
      total = dados.data.length
      res.render('querie', { title: 'Querie 3', resultado: "Total de descendentes: "+total, dados: dados.data});
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/queries/q4',(req,res,next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c750.30.001/procRel?apikey='+key)
    .then(dados => {
      total = dados.data.length
      res.render('querie', { title: 'Querie 4', resultado: "Total de relacionamentos: "+total, dados: dados.data});
    })
    .catch(err => {
      console.log(err)
    })
})






module.exports = router;
