const http = require('http')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const {parse} = require('querystring')

var extraiPost = require('./extraiPost.js')
var concluirTarefa = require('./concluirTarefa.js')
var apagarTarefa = require('./apagarTarefa.js')

var renderIndex = require('./renderIndex.js')

myserver = http.createServer(function(req,res) {

    var data = new Date().toISOString().substring(0, 16)

    console.log("$ -> ",data," - ",req.method)

    var pathName = url.parse(req.url,true).pathname
    console.log("Pathname: ",pathName)

    if (req.method == 'GET') {
        if (pathName == "/") { 
            renderIndex(res,"")

        } else if(/\/editar\/./.test(pathName)) {
            var idTarefa = req.url.split("/")[2]

            renderIndex(res,"editar",idTarefa)

        } else if(/\/apagar\/./.test(pathName)) {
            var idTarefa = req.url.split("/")[3]
            var raiz = req.url.split("/")[2]

           apagarTarefa(res,idTarefa,raiz,() => renderIndex(res,"apagar"))

        }   else if(/\/concluir\/./.test(pathName)) {
            var idTarefa = req.url.split("/")[2]

           concluirTarefa(res,data,idTarefa,() => renderIndex(res,"concluir"))

        } else {
            if (pathName == "/favicon.ico") {
                res.setHeader('Content-Type','image/png; charset=utf-8')
                pagina = './views/img/todo.png'
        
            } else if (pathName == "/style") {
                res.setHeader('Content-Type','text/css; charset=utf-8')
                pagina = './views/css/style.css'
    
            } else if (pathName == "/scripts") {
                res.setHeader('Content-Type','text/javascript; charset=utf-8')
                pagina = './views/js/scripts.js'
    
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

        //Diferente do que fiz no tpc passado, aqui os dados vem num formato tipo querystring
        //No tpc passado eu criava a estrutura que mandada no post
        extraiPost(req,dados => {

            objetoComDados = parse(dados)

            if (pathName == '/tarefa') {
                objetoComDados['criacao'] = data

                axios.post(`http://localhost:3000/tarefasNF/`,objetoComDados)
                    .then(resp => {
                        //renderInserido(res)
                        renderIndex(res,"registar")

                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Erro no POST: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })

            } else if(/\/editada\/./.test(pathName)) {
                var idTarefa = req.url.split("/")[2]

                objetoComDados['editada'] = data

                console.log(objetoComDados)

                axios.put(`http://localhost:3000/tarefasNF/${idTarefa}`,objetoComDados)
                    .then(resp => {

                        renderIndex(res,"editada")
                        //Podia ter deixado o redirect que ia fazer o get novamente, no entanto prefiro fazer o render novamente
                        //res.writeHead(301, {'Location': 'http://localhost:4000/'})
                        //res.end()
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Erro no POST: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })

            }
        })
     
    } else if (req.method == 'DELETE') {
        
        axios.delete('http://localhost:3000'+req.url,{})
        .then((resp) => {
            console.log(resp.data)
        }).catch((error) => {
            console.log("Elemento já removido!")
        })

    } else if (req.method == 'PUT') {

        console.log("Recebi um put")

    }
})

myserver.listen(4000)
console.log("Servidor à escuta na porta 4000...")