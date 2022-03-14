const http = require('http')
const url = require('url')
const fs = require('fs')
const axios = require('axios')

var renderIndex = require('./renderIndex.js')
var renderCursos = require('./renderCursos')
var renderAlunos = require('./renderAlunos')
var renderInstrumentos = require('./renderInstrumentos')
var renderAlunoDetalhe = require('./renderAlunoDetalhe')
var renderCursoDetalhe = require('./renderCursoDetalhe')
var renderInstrumentoDetalhe = require('./renderInstrumentoDetalhe')
var createCurso = require('./createCurso')


myserver = http.createServer(function(req,res) {

    console.log(req.method)

    var pathName = url.parse(req.url,true).pathname
    console.log("Pathname: ",pathName)

    if (req.method == 'GET') {
        if (pathName == "/") { 
            renderIndex(res)
            
        }  else if (pathName == "/alunoDetalhe") {
            var q = url.parse(req.url,true).query
            renderAlunoDetalhe(res,q.id)
            
        } else if (pathName == "/cursoDetalhe") {
            var q = url.parse(req.url,true).query
            renderCursoDetalhe(res,q.id)
            
        } else if (pathName == "/instrumentoDetalhe") {
            var q = url.parse(req.url,true).query
            renderInstrumentoDetalhe(res,q.id)
    
        } else if (pathName == "/createCurso") {
            createCurso(res)

        } else if (pathName == "/proAluno") {
            createCurso(res)

        } else if (pathName == "/alunos" || pathName == "/cursos" || pathName == "/instrumentos") {
            
            var query = url.parse(req.url,true).query
            
            queryJson = JSON.stringify(query)
            
            if (pathName == "/alunos") renderAlunos(res,queryJson)
            
            else if (pathName == "/cursos") renderCursos(res,queryJson)
    
            else if (pathName == "/instrumentos") renderInstrumentos(res,queryJson)
            
        } else {
            if (pathName == "/favicon.ico") {
                res.setHeader('Content-Type','image/png; charset=utf-8')
                pagina = './views/img/servidor.png'
        
            } else if (pathName == "/style") {
                res.setHeader('Content-Type','text/css; charset=utf-8')
                pagina = './views/css/style.css'
    
            } else if (pathName == "/deleteJS") {
                res.setHeader('Content-Type','text/javascript; charset=utf-8')
                pagina = './views/js/scriptDelCurso.js'
        
            } else if (pathName == "/criaCursoJS") {
                res.setHeader('Content-Type','text/javascript; charset=utf-8')
                pagina = './views/js/scriptCreCurso.js'
        
            } else if (pathName == "/scriptSearCurso") {
                res.setHeader('Content-Type','text/javascript; charset=utf-8')
                pagina = './views/js/scriptSearCurso.js'
        
            } else {
                res.setHeader('Content-Type','text/html; charset=utf-8')
                pagina = './views/404.html'
            }

            fs.readFile(pagina,(err,data) => {
                if (err) {
                    console.log(err)
                    res.end()
                } else {
                    res.end(data)
                }
            })
        } 
    } else if (req.method == 'POST') {

        pedido = ''
        if (pathName == '/postCurso') {
            pedido = 'cursos/'
        } else if (pathName == '/postAluno') {
            pedido = 'alunos/'
        } else if (pathName == '/postInstrumento') {
            pedido = 'instrumentos/'
        }

        //Algo que mete o body recebido no post numa string
        let body = '';
        req.on('data', chunk => {
            body += chunk; // convert Buffer to string
        });
        
        req.on('end', () => {

            //Como sei que mandei em formato JSON converto
            dataEmJson = JSON.parse(body)
            console.log("JSON:",dataEmJson);

            
            axios.post(`http://localhost:3000/${pedido}`,dataEmJson)
            .then((resp) => {
                console.log("Inserido: ",resp.data)
            }).catch((error) => {
                console.log("Id ja existente")
            })

            //Resposta para o cliente
            res.end('Post processado! ;)');
        });
        
     
    } else if (req.method == 'DELETE') {
        console.log(req.url)
        
        axios.delete('http://localhost:3000'+req.url,{})
        .then((resp) => {
            console.log(resp.data)
        }).catch((error) => {
            console.log("Elemento já removido!")
        })

    } else if (req.method == 'PUT') {

        console.log("Por fazer...")

    }
})

myserver.listen(4000)
console.log("Servidor à escuta na porta 4000...")