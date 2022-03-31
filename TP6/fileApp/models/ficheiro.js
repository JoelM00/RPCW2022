var mongoose = require('mongoose')

var ficheiroSchema = new mongoose.Schema({
    data: String,
    name: String,
    mimetype: String,
    size: Number,
    descricao: String
})

module.exports = mongoose.model('ficheiro',ficheiroSchema)