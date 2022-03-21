module.exports = function extraiPost(req, callback){
    if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        req.on('data', bloco => {
            body += bloco.toString()
        })
        req.on('end', () => {
            callback(body)
        })
    }
}
