const sqlite = require("sqlite3").verbose()//importa o sqlite
const db = new sqlite.Database("./src/database/database.db")

module.exports = db

// db.serialize(()=>{
    //criar tabela iniciando comandos sql
    //crase para poder usar quebras de linha js template literals
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         adress TEXT,
    //         adress2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    //  inserir dados na table
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         adress,
    //         adress2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `

    // const values = []

    // function afterInsertData(err) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log('Cadastrado com Sucesso')
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)
    // consultar tabela

    // db.all(`SELECT * FROM places`, function(err,rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estao seus registros")
    //     console.log(rows)
    // })

    //deletar da db
    // db.run(`DELETE FROM places WHERE id = ?`, [26], function(err){
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log("registros deletados com sucesso")
    //  })

// })