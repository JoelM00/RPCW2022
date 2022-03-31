const mongoose = require('mongoose')
var Ficheiro = require('../models/ficheiro')

module.exports.list = () => {
    return Ficheiro
        .find()
        .sort({id: 1})
        .exec()
}

module.exports.lookUp = (id) => {
    return Ficheiro
        .findOne({_id: mongoose.Types.ObjectId(id)})
        .exec()
}

module.exports.insert = (ficheiro) => {
    var newFicheiro = new Ficheiro(ficheiro)
    return newFicheiro.save()
}

module.exports.delete = (id) => {
    return Ficheiro
        .deleteOne({ficheiro: id})
        .exec()
}

