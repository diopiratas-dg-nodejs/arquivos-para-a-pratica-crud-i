const fs = require('fs')
const path = require('path')

const logPath = path.join(__dirname, '../data/log.txt')
const log = fs.readFileSync(logPath, 'utf-8')

function logs(req, res, next){
    fs.appendFileSync(logPath, 'O usuario acessou a rota ' + req.url + '\n')
    next()
}

module.exports = logs;