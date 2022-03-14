var fs = require('fs')
const axios = require("axios")


module.exports = function renderAlunoDetalhe(res,id) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Aluno com id:${id}</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
        `


    axios.get(`http://localhost:3000/alunos?id=${id}`)
        .then((resp) => {
            aluno = resp.data
            aluno.forEach(a => {
                
                pagina += `
                <h1>${a.nome}</h1>
                
                <p><strong>Data de Nascimento:</strong> ${a.dataNasc}</p>
                <p><strong>Aluno do curso:</strong> ${a.curso}</p>
                <p><strong>Ano do curso:</strong> ${a.anoCurso}</p>
                <p><strong>Instrumento:</strong> ${a.instrumento}</p>
    
                </body></html>
                `
            })
            res.end(pagina)
        })
        .catch((error) => {
            console.log(error)
        })
  
}