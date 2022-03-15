var fs = require('fs')
const axios = require("axios")


module.exports = function renderCursos(res,query) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Listagem de cursos</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <nav>
                <h1>Listagem de cursos</h1>
                <a href="/createCurso">Criar novo curso</a>
                <a href="/">Pagina principal</a>
            </nav>
            
            <form class="search">
                <input type="text" name="q" placeholder="Procure um curso">
            </form>

            <div class="cursos">
    `

    var queryJson = JSON.parse(query)
    var link = 'http://localhost:3000/cursos?_sort=designacao&_order=asc'

    if (queryJson['q'] != null) {
        link += '&q=' + queryJson['q']
        console.log(link)
    }

    axios.get(link)
        .then((resp) => {
            cursos = resp.data
            cursos.forEach(c => {
                
                pagina += `
                <div class="li-item">
                    <h2>${c.designacao}</h2>
                    <p><small>ID: ${c.id}</small></p>
                    <p><strong>Instrumento:</strong> ${c.instrumento["#text"]}</p>
                    <a href="/cursoDetalhe?id=${c.id}">Ver mais...</a>
                </div>
            
                `
            })

            pagina += `
                </div>
            </body></html>
            `
            res.end(pagina)
        })
        .catch((error) => {
            console.log(error)
        })
  
}