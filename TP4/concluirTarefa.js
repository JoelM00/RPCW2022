var axios = require('axios')

module.exports = function concluirTarefa(res,data,id,callback) {

    //Fazer o get dos dados

    axios.get(`http://localhost:3000/tarefasNF/${id}`)
        .then((resp) => {
            tarefa = resp.data
            
            tarefa['conclusao'] = data

            axios.delete(`http://localhost:3000/tarefasNF/${id}`)
                .then((resp) => {
                    
                    console.log("Tarefa: ",tarefa)
                    
                    //Fazer o put com todos os dados
                    axios.post('http://localhost:3000/tarefasF/',tarefa)
                        .then(res => {
                            console.log("Done")
                        })
                        .catch(err => {
                            console.log(err)
                        })


                        callback()
                
                }).catch((error) => {
                    console.log("Elemento já removido!")
                })
      
        }).catch(err => {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h1>Tentou concluir o concluido</h1>')
            res.write('<p><a href="/">Voltar</a></p>')
            res.end()
        })
}

