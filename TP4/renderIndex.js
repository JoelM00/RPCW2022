var axios = require('axios')


module.exports = async  function renderIndex(res,tipo,id) {

    var data = new Date().toISOString().substring(0, 16)
    res.setHeader('Content-Type','text/html; charset=utf-8')


    if (tipo == "editar") {
        await axios.get(`http://localhost:3000/tarefasNF?id=${id}`)
            .then(resp => {
                tarefa = resp.data[0]
                formulario = `
                    <div class="formulario">
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
                    </div>`
            }).catch(err => {
                console.log(error)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>Nao foi possvel obter a lista de alunos...")
                res.end()
            })
    
    } else {
        
        formulario = `
        <div class="formulario">
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
        </div>`
    
    }
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
            <h1>Lista de tarefas</h1>
        </nav>
        
        <hr>

       `+formulario+`

        <hr>
    
        <div class="row">
            <div class="column">
                <h3>Pendentes</h3>
    `
    axios.get(`http://localhost:3000/tarefasNF?_sort=criacao&_order=desc`)
        .then((resp) => {
            tarefasF = resp.data
            tarefasF.forEach(t => {
                
                pagina += `
                <div class="li-item">
                    <h2>${t.tarefa}</h2>
                    <p><strong>Criada a:</strong> ${t.criacao}</p>
                    <p><strong>Executor:</strong> ${t.executor}</p>
                    <p><strong>Tipo:</strong> ${t.tipo}</p>
                    <p><strong>Limite até:</strong> ${t.limite}</p>
                `

                if (t.editada) {
                    pagina += `<p><strong>Editada a:</strong> ${t.editada}</p>`
                }

                pagina += `
                    <a href="/editar/${t.id}">Editar</a>
                    <a href="/apagar/NF/${t.id}">Apagar</a>
                    <a href="/concluir/${t.id}">Concluir</a>
                    <p><small>Id: ${t.id}</small></p>
                </div>
                `
            })

            pagina += ` 
            </div>
            <div class="column">
                <h3>Concluídas</h3>
            `

            axios.get(`http://localhost:3000/tarefasF?_sort=conclusao&_order=desc`)
                .then((resp) => {
                    tarefasF = resp.data
                    tarefasF.forEach(t => {
                        
                        pagina += `
                        <div class="li-item">
                            <h2 class="risca">${t.tarefa}</h2>
                            <p>Criada a: ${t.criacao}</p>
                            <p>Executor: ${t.executor}</p>
                            <p>Tipo: ${t.tipo}</p>
                            <p>Limite até: ${t.limite}</p>
                        `
                        if (t.editada) {
                            pagina += `<p><strong>Editada a:</strong> ${t.editada}</p>`
                        }
                            
                        pagina += `
                            <p><strong>Concluída a:</strong> ${t.conclusao}</p>
                            <a href="/apagar/F/${t.id}">Apagar</a>
                            <p><small>Id: ${t.id}</small></p>
                        </div>
                        `
                    })

                    pagina += `
                            </div>
                        </div>

                        <div id="snackbar-registo">Tarefa inserida com sucesso! </div>
                        <div id="snackbar-apagar">Tarefa apagada com sucesso! </div>
                        <div id="snackbar-conluida">Tarefa conluída com sucesso! </div>
                        <div id="snackbar-editar">Tarefa editada com sucesso! </div>

                    <footer>
                        <address>Gerado por &copy; JoelM  ::  TPC 4  ::  RPCW ::  ${data}</address>
                    </footer>

                    `
                    if (tipo != "") {
                        var divSelecionada
                        if (tipo == "registar") {
                            divSelecionada = 'snackbar-registo'
                        } else if (tipo == "concluir") {
                            divSelecionada = 'snackbar-conluida'
                        } else if (tipo == "apagar") {
                            divSelecionada = 'snackbar-apagar'
                        } else if (tipo == "editada") {
                            divSelecionada = 'snackbar-editar'
                        }
                        pagina += `
                        <script>
                            // Get the snackbar DIV
                            var x = document.getElementById("${divSelecionada}");
                        
                            // Add the "show" class to DIV
                            x.className = "show";
                        
                            // After 3 seconds, remove the show class from DIV
                            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                        </script>`
                    }
                    
                    `
                </body>
                </html>
                `
                res.end(pagina)
            
            }).catch(error => {
                console.log(error)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>Nao foi possvel obter a lista de tarefas...")
                res.end()
            })
        }).catch(erro => {
            console.log("O json server esta a dormir! :(")
        })

    
}

