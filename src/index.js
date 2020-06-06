

const express = require("express")
const server = express()



//configurar pasta publica
server.use(express.static("public"))

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})




//configurar caminhos
//pagina inicial
server.get("/", (req, res)=>{
    return res.render("index.html")
})

server.get("/create-point", (req, res)=>{
    return res.render("create-point.html")
})

server.get("/search-results", (req, res)=>{
    return res.render("search-results.html")
})
//ligar servidor
server.listen(3000)
