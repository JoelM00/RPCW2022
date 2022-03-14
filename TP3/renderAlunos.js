var fs = require('fs')
const axios = require("axios")


module.exports = function renderAlunos(res,query) {

    res.setHeader('Content-Type','text/html; charset=utf-8')

    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Listagem de alunos</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <nav>
                <h1>Listagem de alunos</h1>
                <a href="/createAluno">Criar novo aluno</a>
                <a href="/">Pagina principal</a>
            </nav>

            <form class="search">
                <input type="text" name="q" placeholder="Procure um aluno">
            </form>

            <div class="alunos">
                <table class="w3-table w3-bordered">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Detalhes</th>
                    </tr>
    `

    var queryJson = JSON.parse(query)
    var link = 'http://localhost:3000/alunos?_sort=nome&_order=asc'

    if (queryJson['q'] != null) {
        link += '&q=' + queryJson['q']
        console.log(link)
    }
                

    axios.get(link)
        .then((resp) => {
            alunos = resp.data
            alunos.forEach(a => {
                
                pagina += `
                        <tr class="li-item">
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                            <td>${a.curso}</td>
                            <td><a href="/alunoDetalhe?id=${a.id}">Ver mais...</a></td>
                        </tr>
                `
            })
            pagina += `
                </table>
            </div>
        </body></html>
        `
            res.end(pagina)
        })
        .catch((error) => {
            console.log(error)
        })
  
}

