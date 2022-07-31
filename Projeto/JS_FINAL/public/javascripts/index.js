

$(function() {
    function normal() {
        $("#atividade").empty()
        $.ajax({
            url: endpoint+'/atividade',
            type: 'GET',
            success: function(data) {
                if (data.length > 0) {
                    $("#atividade").append("<h3>Ultima Atividade</h3>")
                    $("#atividade").append('<button id="atualizar"> Atualizar')
                    data.forEach(u => {
                        if (u.musica == undefined) {
                            $("#atividade").append(`
                                <p>Utilizador: <a href="users/${u.nome}">${u.nome}</a> ouviu uma musica apagada</p>
                            `)
                        } else {
                            $("#atividade").append(`
                                <p>Utilizador: <a href="users/${u.nome}">${u.nome}</a> ouviu a musica: <a href="musicas/${u.musica._id}">${u.musica.nome}</a></p>
                            `)
                        }
                    })
                }
            }
        });
    }

    normal()

    $("body").on('click', '#atualizar', function () {
        event.preventDefault()
        normal()
    })

})