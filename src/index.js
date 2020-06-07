

const express = require("express")
const server = express()

//pegar db
const db = require("../src/Database/db.js")


//configurar pasta publica
server.use(express.static("public"))

//habilitar o req.body
server.use(express.urlencoded({ extended: true }))

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

    //req.query pega dados enviados por metodo get
})

server.post("/savepoint", (req, res)=>{
    //usar req.body para enviae o form pelo metodo post
     //inserir dados na table
    const query = `INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err){
            return res.send("ERRO no cadastro!")
        }
        console.log('Cadastrado com Sucesso')
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)
    
})


server.get("/search-results", (req, res)=>{

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", { total: 0 })
    }


    //pegar dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length
        //mostras pagina html com os dados do db
        return res.render("search-results.html",{places: rows, total})
    })

    
})
//ligar servidor
server.listen(3000)
