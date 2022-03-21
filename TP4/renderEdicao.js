var axios = require('axios')

module.exports = function renderEdicao(res,id) {

    var data = new Date().toISOString().substring(0, 16)

    res.setHeader('Content-Type','text/html; charset=utf-8')

    axios.get(`http://localhost:3000/tarefasNF?id=${id}`)
            .then((resp) => {
                tarefa = resp.data[0]

                var pagina = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Edicao</title>
                    
                    
                    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                
                    
                    <link rel="stylesheet" href="/style" type="text/css">
                </head>
                <body>
                    
                    <nav>
                        <h1>Edição de tarefa</h1>
                        <a href="/">Voltar para a lista de tarefas</a>
                    </nav>
                
                    <hr>
                
                    <form class="w3-container" action="/editada/${id}" method="POST">
                        <label for="executor">Executor:</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="executor" placeholder="Quem ira fazer a tarefa?" value="${tarefa.executor}" required>
                        <label for="limite">Limite:</label>
                        <input class="w3-input w3-border w3-light-grey" type="date" name="limite" placeholder="Data limite?" value="${tarefa.limite}" required>
                        <label for="tarefa">Tarefa:</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="tarefa" placeholder="Em que consiste a tarefa?"  value="${tarefa.tarefa}" required>
                        <label for="tipo">Tipo:</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="tipo" placeholder="Qual o tipo da tarefa?"  value="${tarefa.tipo}" required>
                        <label for="id">Identificador:</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="id" value="${tarefa.id}" disabled>
                        
                        <input class="esconde" type="text" name="criacao" value="${tarefa.criacao}">

                        <input class="w3-btn w3-red w3-margin-top" type="submit" value="Editar"/>
                    </form>
                
                
                    <footer>
                        <address>Gerado por &copy; JoelM  ::  TPC 4  ::  RPCW ::  ${data}</address>
                    </footer>
                </body>
                </html>
                `
                
               res.end(pagina)

            
            }).catch(error => {
                console.log(error)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>Nao foi possvel obter a lista de alunos...")
                res.end()
            })

}

