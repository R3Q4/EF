import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'R3Q4',
    database: 'ecofind'
})


export default pool;