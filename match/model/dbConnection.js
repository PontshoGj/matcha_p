// require('dotenv').config()
let mysql = require('mysql')

class dbConnection{
 
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

    //getting mathed user 
    async getMatch(interest, res){
        try {
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                let r = interest.split(',')
                let g = r.join("%]'||'[%")
                let latitude = -30.559483
                let longitude = 22.937506
                let r_earth = Math.pow(6371, 3)
                console.log(`SELECT * FROM users WHERE interest LIKE \'[%${g.substring(1, g.length - 1)}%]\' && latidute BETWEEN ${latitude} AND ${latitude + (5 / r_earth) * (180 / 3.145)} && longitude BETWEEN ${longitude} AND ${longitude + (5 / r_earth) * (180 / 3.145) / Math.cos(latitude * 3.145/180)}`)
                this.connection.query(`SELECT * FROM users WHERE interest LIKE \'[%${g.substring(1, g.length - 1)}%]\' && latidute BETWEEN latidute AND ${latitude + (5 / r_earth) * (180 / 3.145)} && longitude BETWEEN longitude AND ${longitude + (5 / r_earth) * (180 / 3.145) / Math.cos(latitude * 3.145/180)}`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                         console.log(result);
                        if(check.localeCompare('[]') !== 0){
                            //  console.log(result);
                            //  res.json({result: 1, email: result[0].email})
                        }else{
                            // res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
                // this.connection.end()
            })
        } catch (error) {
            
        }
    }

}

module.exports = dbConnection;