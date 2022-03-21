var axios = require('axios')


module.exports = function apagarTarefa(res,id,raiz,callback) {

    axios.delete(`http://localhost:3000/tarefas${raiz}/${id}`)
        .then((resp) => {

            console.log(resp.data)
            callback()

        }).catch(err => {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h1>Tentou apagar o apagado</h1>')
            res.write('<p><a href="/">Voltar</a></p>')
            res.end()
        })
    
}

