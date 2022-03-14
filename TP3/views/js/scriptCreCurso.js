
const form = document.querySelector('form')

criarBtn = document.querySelector('.criar')

criarBtn.addEventListener('click',async (e) => {

    axios.post('http://localhost:4000/postCurso',{
        designacao: form.designacao.value,
        duracao: form.duracao.value,
        instrumento: {
            id: form.idInstrumento.value,
            "#text": form.nomeInstrumento.value
        }
    })
    .then((resp) => {
        console.log(resp.data)
        window.location.replace('http://localhost:4000/cursos')
    }).catch((error) => {
        console.log("Id ja existente")
    })

})



