var fs = require('fs')
const axios = require("axios")


module.exports = function renderInstrumentoDetalhe(res,id) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Instrumento com id:${id}</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
        `


    axios.get(`http://localhost:3000/instrumentos?id=${id}`)
        .then((resp) => {
            instrumento = resp.data
            instrumento.forEach(i => {
                
                pagina += `
                <h1>${i["#text"]}</h1>
                <p><small>ID: ${i.id}</small></p>
                </body></html>
                `
            })
            res.end(pagina)
        })
        .catch((error) => {
            console.log(error)
        })
  
}