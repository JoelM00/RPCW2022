var fs = require('fs')

module.exports = function renderInserido(res) {

    var data = new Date().toISOString().substring(0, 16)

    res.setHeader('Content-Type','text/html; charset=utf-8')


    var pagina = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tarefas</title>
        
        
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
        
        <link rel="stylesheet" href="/style" type="text/css">
    </head>
    <body>
        
        <nav>
            <h1>Inserção realizada com sucesso!</h1>
            <a href="/">Voltar para a lista de tarefas</a>
            <a href="/criar">Voltar para o registo</a>
        </nav>


        <footer class="w3-black w3-padding w3-center w3-bottom">
            <address>Gerado por &copy; JoelM :: TPC 4 :: RPCW :: {data}</address>
        </footer>
    </body>
    </html>
    `
    
   res.end(pagina)
}

