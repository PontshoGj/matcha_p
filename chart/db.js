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
        try{
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            await connection.connect((err) => {
                if (!this.errors(err)) return
                connection.query(`INSERT INTO messages SET froms = ${parseInt(user_id)}, tos = ${parseInt(friend_id)}, message = ?`, message,(err, result) => {
                    if (!err){
                        // console.log(result)
                    }else{
                        console.log(err)   
                    }
                    connection.end()
                })
            })
        }catch(e){

        }
    }

    async notif(friend_id, user_id, message){
        try{
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            await connection.connect((err) => {
                if (!this.errors(err)) return
                connection.query(`INSERT INTO notif SET user_id = ${parseInt(user_id)}, friend_id = ${parseInt(friend_id)}, value = ?`, message,(err, result) => {
                    if (!err){
                        // console.log(result)
                    }else{
                        console.log(err)   
                    }
                    connection.end()
                })
            })
        }catch(e){

        }
        
    }


    async getmes(friend_id, user_id, client){
        try {
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            let info = new Promise(async(resolve, reject) =>{
            await connection.connect((err) => {
                if (!this.errors(err)) return
                connection.query(`SELECT * FROM messages WHERE froms = ${parseInt(user_id)} && tos = ${parseInt(friend_id)} || froms = ${parseInt(friend_id)} && tos = ${parseInt(user_id)}`, (err, result) => {
                    if (!err){
                        if(result.length > 0){
                            // console.log(result)
                            resolve({result: 1, user_id: user_id, friend_id: friend_id ,info: result.map(res=>{
                                return {message: res.message, to: res.tos, from: res.froms, date: res.date}
                            })})
                        }else{
                            resolve({result: 0})
                        }
                    }else{
                        reject({result: 0})
                        console.log(err);
                    }
                    connection.end()
                })
            })
            let me = await info
            if (me.result){
                // console.log(me.result)
                client.emit('me', me)
            }

        })
        } catch (error) {
            
        }
    }
    async savet(time,id){
        try {
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            let info = new Promise(async(resolve, reject) =>{
            await connection.connect((err) => {
                if (!this.errors(err)) return
                connection.query(`UPDATE users SET date = TIMESTAMP("${time}") where id = ${id}`, (err, result) => {
                    if (!err){
                        // console.log(result)
                        if(result.length > 0){
                            // resolve({result: 1, user_id: user_id, friend_id: friend_id ,info: result.map(res=>{
                                // return {message: res.message, to: res.tos, from: res.froms, date: res.date}
                            // })})/
                        }else{
        
                            // resolve({result: 0})
                        }
                    }else{
                        // reject({result: 0})
                        console.log(err);
                    }
                    connection.end()
                })
            })
            let me = await info
            if (me.result){
                // console.log(me.result)
                client.emit('me', me)
            }

        })
        } catch (error) {
            
        }
    }
}

module.exports = db;