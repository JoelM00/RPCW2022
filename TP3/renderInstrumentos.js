var fs = require('fs')
const axios = require("axios")


module.exports = function renderInstrumentos(res,query) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Listagem de instrumentos</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <nav>
                <h1>Listagem de instrumentos</h1>
                <a href="/createInstrumento">Criar novo instrumento</a>
                <a href="/">Pagina principal</a>
            </nav>
            
            <form class="search">
                <input type="text" name="q" placeholder="Procure um instrumento">
            </form>

            <div class="instrumentos">
    `
    var queryJson = JSON.parse(query)
    var link = 'http://localhost:3000/instrumentos?_order=asc'

    if (queryJson['q'] != null) {
        link += '&q=' + queryJson['q']
        console.log(link)
    }

    axios.get(link)
        .then((resp) => {
            instrumentos = resp.data
            instrumentos.forEach(i => {
                
                pagina += `
                <div class="li-item">
                    <h2>${i["#text"]}</h2>
                    <p><small>ID: ${i.id}</small></p>
                    <a href="/instrumentoDetalhe?id=${i.id}">Ver mais...</a>
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
