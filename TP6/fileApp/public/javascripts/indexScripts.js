var botao = document.getElementById('ver')
const mostrador = document.querySelector('.mostrador')

const render = dados => {
    mostrador.innerHTML = dados
}

function reload() {
    reload = location.reload();
}


function visualizador(id,tipo) {
    document.getElementById('start-modal').style.display='block'

    console.log(id,tipo)

    mostrador.innerHTML = ''

    if (/audio/.test(tipo)) {
        console.log("audio")

        var info = `<audio controls>
            <source src="http://localhost:4000/ver/${id}" type="${tipo}">
        </audio>`

        
    } else if (/image/.test(tipo)) {
        
        var info = `<img src="http://localhost:4000/ver/${id}" type="${tipo}">`

    } else if (/text/.test(tipo) || /application/.test(tipo)) {
        
        var info = `<iframe src="http://localhost:4000/ver/${id}" type="${tipo}">`
    
    } else {
        var info = "Formato indisponivel!"
    }   

    mostrador.innerHTML = info
}

