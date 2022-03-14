
const id = new URLSearchParams(window.location.search).get('id')

deleteBtn = document.querySelector('.delete-btn')

deleteBtn.addEventListener('click',async (e) => {

    axios.delete('http://localhost:4000/cursos/'+id,{})
    .then((resp) => {
        console.log(resp.data)
    }).catch((error) => {
        console.log("Elemento já removido!")
    })

    window.location.replace('http://localhost:4000/cursos')
})

