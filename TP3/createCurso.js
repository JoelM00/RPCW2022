var fs = require('fs')
const axios = require("axios")


module.exports = function createCurso(res) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cria um curso</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <h1>Cria um novo curso</h1>

            <form>
                <label>Designacao do curso:</label>
                <input class="caixa" type="text" name="designacao" required placeholder="designacao do curso">
                <label>Duracao do curso:</label>
                <input class="caixa" type="text" name="duracao" required placeholder="duracao do curso">
                <label>ID do intrumento:</label>
                <input class="caixa" type="text" name="idInstrumento" required placeholder="ID do instrumento">
                <label>Nome do instrumento:</label>
                <input class="caixa" type="text" name="nomeInstrumento" required placeholder="Nome do instrumento">
                <button class="criar">Criar curso</button>
            </form>


            <script src="/criaCursoJS"></script>
        </body></html>
        `
    res.end(pagina)
  
}