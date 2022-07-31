

var playBtn = document.getElementById('play-btn')
var stopBtn = document.getElementById('stop-btn')
var volumeBtn = document.getElementById('volume-btn')

var id = document.getElementById('id-musica').innerHTML

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#fff',
    progressColor: '#DC143C',
    barWidth: 4,
    height: 90,
    responsive: true,
    hideScrollbar: true,
    barRadious: 4,
    cursorColor: "#000"
});

wavesurfer.load('/musicas/ouvir/'+id);

playBtn.onclick = () => {
    wavesurfer.playPause()
    if (playBtn.src.includes("/images/play.png")) {
        playBtn.src = "/images/pause.png"
    } else {
        playBtn.src = "/images/play.png"
    }
}

stopBtn.onclick = () => {
    wavesurfer.stop()
    playBtn.src = "/images/play.png"
}

volumeBtn.onclick = () => {
    wavesurfer.toggleMute()
    if (volumeBtn.src.includes("/images/volume.png")) {
        volumeBtn.src = "/images/mute.png"
    } else {
        volumeBtn.src = "/images/volume.png"
    }
}

wavesurfer.on('finish', () => {
    playBtn.src = "/images/play.png"
    wavesurfer.stop()
});


$(document).ready(function() {

    var favorita
    var id = $("#id-musica").html()

    function normal() {
        $("#comentarios").empty()
        $.ajax({
            url: endpoint+'/musicas/'+id+'/comentarios',
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
        $.ajax({
            url: endpoint+'/musicas/favoritas',
            type: 'GET',
            success: function(res) {
                res.forEach(f => {
                    if (f.musica == id) {
                        favorita = true
                    } 
                })
                if (!favorita) {
                    $(".favorito").css("background-color", "transparent");
                } else {
                    $(".favorito").css("background-color", "red");
                }
            }
        })
    }

    normal()

    $("body").on('click', '#comentar', function () {
        event.preventDefault()
        if ($("#comentario-form").val() != "") {
            $.ajax({
                url: endpoint+'/musicas/comentario/'+id,
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
            url: endpoint+'/musicas/comentario/'+id,
            data: { _id: this.id },
            type: 'DELETE',
            success: function(res) {
                normal()
                informa(res)
            }
        });
    })

    $("body").on('click', '.favorito', function () {
        event.preventDefault()
        if (favorita) {
            $.ajax({
                url: endpoint+'/musicas/remover/',
                data: { _id: this.id },
                type: 'PUT',
                success: function(res) {
                    console.log(res)
                    favorita = false
                    normal()
                }
            });
        } else {
            $.ajax({
                url: endpoint+'/musicas/favoritas/',
                data: { _id: this.id },
                type: 'PUT',
                success: function(res) {
                    console.log(res)
                    favorita = true
                    normal()
                }
            });
        }
    })

    
    $("body").on('click', '#atualizar', function () {
        event.preventDefault()
        normal()
    })

})