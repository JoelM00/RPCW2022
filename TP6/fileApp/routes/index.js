var express = require('express')
var multer = require('multer')
var fs = require('fs')


//Pasta destino para o multer colocar os ficheiros extraidos do pedido
var upload = multer({dest: './uploads'})

var router = express.Router()

var Ficheiro = require('../controllers/ficheiro')

/* GET home page. */
router.get('/', function(req, res, next) {
  Ficheiro.list()
    .then(data => {
      res.render('index',{title: "Gestor",ficheiros: data})
    }).catch(err => {
      res.render('error',{error: err})
    })
});

router.get('/apagar/:id', function(req, res, next) {
  Ficheiro.lookUp(req.params.id)
    .then(ficheiro => {
      Ficheiro.delete(req.params.id)
        .then(nada => {
          var file = __dirname + '/../fileStore/' + ficheiro.name
          fs.unlink(file, function (err) {
            if (err) throw err;
            res.redirect(301,'/')
          });
        })
    })
    .catch(err => console.log(err))
});


router.get('/descarregar/:id', function(req, res, next) {
  Ficheiro.lookUp(req.params.id)
    .then((ficheiro) => {
      var file = __dirname + '/../fileStore/' + ficheiro.name
      res.download(file);
    })
    .catch(err => res.render('error',{error: err}))
});

router.get('/ver/:id', function(req, res, next) {
  Ficheiro.lookUp(req.params.id)
    .then(ficheiro => {

      var file = __dirname + '/../fileStore/' + ficheiro.name

      fs.access(file, fs.constants.F_OK, err => {
        //check that we can access  the file
        console.log(`${file} ${err ? "does not exist" : "exists"}`);
      });
      
      fs.readFile(file, (err, content) => {
        if (err) {
          res.writeHead(404, { "Content-type": "text/html" });
          res.end("<h1>No such image</h1>");
        } else {
          //specify the content type in the response will be an image
          res.writeHead(200, { "Content-type": ficheiro.mimetype });
          res.end(content);
        }
      })
    })
    .catch(err => res.render('error',{error: err}))
})


router.post('/upload',upload.single('ficheiro'),(req,res) => {
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../fileStore/' + req.file.originalname

  fs.rename(oldPath,newPath,erro => {
      if (erro) {
          console.log("Erro ao fazer rename!")
      }
  })

  var d = new Date().toISOString().substring(0,16)

  var ficheiro = {
    data: d,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    descricao: req.body.descricao
  }
  Ficheiro.insert(ficheiro)
    .then(nada =>  res.redirect(301,'/'))
    .catch(err => res.render('error',{error: err}))
})


module.exports = router;
