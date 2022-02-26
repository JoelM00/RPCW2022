var http =  require('http');
var url = require('url');
const fs = require('fs');


myservidor = http.createServer(function(req,res) {

    console.log(" -> Pedido recebido!")

    res.setHeader('Content-Type','text/html; charset=utf-8')
   

    var pathname = url.parse(req.url,true).pathname
    console.log("Pathname: " + pathname)

    /*
    if (pathname == "/") {
        res.statusCode = 301
        res.setHeader('Location','/index.html')
        res.end()   
    } else if (pathname == "/atores") {
        res.statusCode = 301
        res.setHeader('Location','/indexAtores.html')
        res.end() 
    } else if (pathname == "/filmes") {
        res.statusCode = 301
        res.setHeader('Location','/indexFilmes.html')
        res.end() 
    } else {
    }
*/
    var parsedPath = pathname.split("/");
    console.log(parsedPath)

    var pagina = ''
    if (parsedPath[1] == 'index.html') {
        pagina = "./site/index.html"
    } else if (parsedPath[1] == 'filmes' && parsedPath[2].substring(0,1) == 'f') {
        pagina = "./paginas/" + parsedPath[1] + "/" + parsedPath[2] + ".html"
    } else if (parsedPath[1] == 'indexFilmes.html') {
        pagina = "./site/indexFilmes.html"
    } else if (parsedPath[1] == 'atores' && parsedPath[2].substring(0,1) == 'a') {
        pagina = "./paginas/" + parsedPath[1] + "/" + parsedPath[2] + ".html"
    } else if (parsedPath[1] == 'indexAtores.html') {
        pagina = "./site/indexAtores.html"
    } else if (parsedPath[2] == 'scripts.js') {
        pagina = "./site/js/scripts.js"
    } else if (parsedPath[2] == 'favicon.png') {
        pagina = "./site/img/favicon.png"
    } else if (parsedPath[2] == 'filme.png') {
        pagina = "./site/img/filme.png"
    } else if (parsedPath[2] == 'ator.png') {
        pagina = "./site/img/ator.png"
    } else {
        console.log("Pagina inexistente!")
    }

    console.log("Pagina a ser lida: ",pagina)


    // Envia a pagina html
    fs.readFile(pagina,(err,data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
})


myservidor.listen(8888)
console.log(" -> Servidor à escuta na porta 8888...")
