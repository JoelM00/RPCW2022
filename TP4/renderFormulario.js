var fs = require('fs')

module.exports = function renderFormulario(res) {

    var data = new Date().toISOString().substring(0, 16)

    res.setHeader('Content-Type','text/html; charset=utf-8')


    var pagina = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario</title>
        
        
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
        
        <link rel="stylesheet" href="/style" type="text/css">
    </head>
    <body>
        
        <nav>
            <h1>Registo de tarefa</h1>
            <a href="/">Voltar para a lista de tarefas</a>
        </nav>
    
        <hr>
    
        <form class="w3-container" action="/tarefa" method="POST">
            <label for="executor">Executor:</label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="executor" placeholder="Quem ira fazer a tarefa?" required>
            <label for="limite">Limite:</label>
            <input class="w3-input w3-border w3-light-grey" type="date" name="limite" placeholder="Data limite?" required>
            <label for="tarefa">Tarefa:</label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="tarefa" placeholder="Em que consiste a tarefa?" required>
            <label for="tipo">Tipo:</label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="tipo" placeholder="Qual o tipo da tarefa?" required>
            <label for="id">Identificador:</label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="id" placeholder="Qual o id da tarefa?" required>
            
    
            <input class="w3-btn w3-red w3-margin-top" type="submit" value="Registar"/>
            <input class="w3-btn w3-red w3-margin-top" type="reset" value="Reset"/> 
        </form>
    
    
        <footer>
            <address>Gerado por &copy; JoelM  ::  TPC 4  ::  RPCW ::  ${data}</address>
        </footer>
    </body>
    </html>
    `
    
   res.end(pagina)
}

