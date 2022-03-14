var fs = require('fs')

module.exports = function renderIndex(res) {

    res.setHeader('Content-Type','text/html; charset=utf-8')


    var pagina = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagina HTML</title>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <nav>
                <h1>Pagina principal</h1>
            </nav>

            <nav class="links">
                <a href="/alunos">Listagem de alunos</a>
                <a href="/cursos">Listagem de cursos</a>
                <a href="/instrumentos">Listagem de instrumentos</a>
            </nav>
        </body>
    </html>
    `
    
   res.end(pagina)
}

