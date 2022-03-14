var fs = require('fs')
const axios = require("axios")


module.exports = function renderCursoDetalhe(res,id) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Curso com id:${id}</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
        `


    axios.get(`http://localhost:3000/cursos?id=${id}`)
        .then((resp) => {
            curso = resp.data
            curso.forEach(c => {
                
                pagina += `
                <h1>${c.designacao}</h1>
               
                <p><strong>Duracao do curso: </strong>${c.duracao}</p>
                <p><strong>Instrumento:</strong> ${c.instrumento["#text"]}</p>
                <p><small>ID: ${c.instrumento.id}</small></p>


                <button class="delete-btn">delete</button>
                <script src="/deleteJS"></script>
                </body></html>
                `
            })
            res.end(pagina)
        })
        .catch((error) => {
            console.log(error)
        })
}