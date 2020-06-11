require('dotenv').config()
const {MongoClient} = require('mongodb');
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
    async insertImage (user, res) {
        try{
            //connecting to the mongodb cloud database
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                this.connection.query('INSERT INTO images SET ?', user, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('image saved');
                            // res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("image insertion failed")
                            // res.json({result: 0, err: {insert: "image insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        // res.json({result: 0, err: {insert: "image insertion failed"}});
                    }
                })
            })
        }catch (e) {
            console.log(e);
            // res.json({result: 0, err: {insert: "image insertion failed"}});
        }
    }
    async getImage (user_id, res) {
        try{
            //connecting to the mongodb cloud database
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`SELECT * FROM images WHERE user_id = ${user_id.user_id}`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                            let image = result.map(result =>{
                                let u8 = new Uint8Array(result.img)
                                var base64Image = new Buffer(u8, 'binary').toString('base64');
                                return  `data:image/jpeg;base64,${base64Image}`;

                            })
                             res.json({result: 1, img: image})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }
    }
}

module.exports = dbConnection;