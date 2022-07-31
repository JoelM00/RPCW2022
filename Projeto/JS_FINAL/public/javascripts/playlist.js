

$(document).ready(function() {

    var id = $("#id-playlist").html()

    function normal() {
        $("#comentarios").empty()

        $.ajax({
            url: endpoint+'/playlists/'+id+'/comentarios',
            type: 'GET',
            success: function(res) {

                if (res.comentarios.length > 0) {
                    
                    var htmlComentarios = `
                    <h3>Comentarios</h3>
                    <button id="atualizar"> Atualizar </button>
                    <table class="w3-table">
                        <tbody>
                            <tr>
                                <th>Comentario</th>
                                <th>Autor</th>
                                <th>Data</th>
                            </tr>
                    `
                    res.comentarios.forEach(c => {
                        htmlComentarios += `
                            <tr id="comentario-${c._id}">
                                <td>${c.comentario}</td>
                                <td><a href="/users/${c.nome}">${c.nome}</a></td>
                                <td>${c.data}</td>`
                            if (c.nome == res.user.nome || res.user.tipo == "admin") {
                                htmlComentarios += `
                                    <td>
                                        <button id=${c._id} class="remover"> ✖
                                    </td>
                                    `
                            }

                        htmlComentarios +=`
                            </tr>
                        `
                    })

                    htmlComentarios += `
                        </tbody>
                    </table>
                    `
                    
                    $("#comentarios").append(htmlComentarios)
               } 
            }
        });
    }

    normal()

    $("body").on('click', '#comentar', function () {
        event.preventDefault()
        if ($("#comentario").val() != "") {
            $.ajax({
                url: endpoint+"/playlists/comentario/"+id,
                data: $("#comentario-form").serialize(),
                type: 'POST',
                success: function(res) {
                    $("#comentario").val("")
                    normal()
                    informa(res)
                }
            });
        } else {
            informa("Escreva algo...")
        }
    })

    $("body").on('click', '.remover', function () {
        event.preventDefault()
        $.ajax({
            url: endpoint+'/playlists/comentario/'+id,
            data: { _id: this.id },
            type: 'DELETE',
            success: function(res) {
                normal()
                informa(res)
            }
        });
    })

        
    $("body").on('click', '#atualizar', function () {
        event.preventDefault()
        normal()
    })
})