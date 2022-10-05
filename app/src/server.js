import http from 'http'
import { createConnection } from 'mysql'

const PORT = 3000

const connection = createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'full-cycle'
})

connection.connect(() => {
    createTable()
    console.log(`Database connected!!!`)
})

function createTable() {
    connection.query(`
    create table if not exists pessoas(
        id int not null auto_increment, 
        nome varchar(50) not null,
        primary key (id)
)`)
}

let indexpessoas = 0
const server = http.createServer((req, res) => {
    connection.query(`insert into pessoas (nome) values ("pessoas ${indexpessoas}")`, (err, results, _) => {
        connection.query(`select * from pessoas as pessoas`, (err, results, _) => {
            res.end(response(results))
            indexpessoas++
        })
    })
})

function response(results) {
    console.log(results)
    return `
    <h1>Full Cycle Rocks!</h1>
    <ul>
        ${results.map(({ nome }) => `<li>${nome}</li>`)}
    </ul>
    `
}

server.listen(PORT, () => console.log(`Server is running at ${PORT}`))