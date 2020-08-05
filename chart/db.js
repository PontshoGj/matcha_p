// require('dotenv').config()
let mysql = require('mysql')

class db{
 
    constructor (){
        this.connection =  mysql.createPool({
            host     : 'mysql',
            port     : 3306,
            user     : 'root',
            password : 'root',
            database : 'matcha',
            connectionLimit: 10
        })
    }

    //database errors
    errors (err) {
        if (err){
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.');
                return 0;
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.');
                return 0;
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.');
                return 0;
            }
            throw err;
        }
        return 1;
    }

    async save(friend_id, user_id, message){

    }

}

module.exports = db;