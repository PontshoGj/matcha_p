require('dotenv').config()
const {MongoClient} = require('mongodb');
let mysql = require('mysql')
const process = require('process');

class dbConnection{
 
    constructor (){
        this.connection =  mysql.createPool({
            host     : 'mysql',
            port     : 3306,
            user     : 'root',
            password : 'root',
            database : 'matcha',
            connectionLimit: 100000000
        })
    }

    //database errors
    errors (err) {
        if (err){
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.');
                return 0;
            }
            else if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.');
                process.exit(1)
                return 0;
            }
            else if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.');
                return 0;
            }else{
                console.log(err);
                process.exit(1)
            }
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
                        // console.log(result)
                        if(result.affectedRows){
                            console.log('image saved');
                            // console.log(result.insertId)
                            if (result.insertId % 10 === 1 || result.insertId % 10 === 6){
                                // console.log(user)
                                this.connection.query(`INSERT INTO profimage SET image_id = ${result.insertId}, user_id = ${user.user_id}, img = ?`, user.img,(err, result) => {
                                    if (!err){
                                        console.log("done")
                                    }else{
                                        console.log(err)
                                    }
                                })
                            }
                            // res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("image insertion failed")
                            res.json({result: 0, err: {insert: "image insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0, err: {insert: "image insertion failed"}});
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
                            let image_id = result.map(result =>{
                                return result.image_id
                            })
                            // console.log(image_id)
                             res.json({result: 1, img: image, image_id: image_id})
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
    async getProfImage (user_id, res) {
        try{
            let connection = mysql.createConnection({
                host     : 'mysql',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000,
            })
            //connecting to the mongodb cloud database
            await connection.connect((err) => {
                if (!this.errors(err)) return
                connection.query('USE matcha');
                connection.query(`SELECT * FROM profimage WHERE user_id = ${user_id.user_id}`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                            let image = result.map(result =>{
                                let u8 = new Uint8Array(result.img)
                                var base64Image = new Buffer(u8, 'binary').toString('base64');
                                return  `data:image/jpeg;base64,${base64Image}`;

                            })
                            let image_id = result.map(result =>{
                                return result.image_id
                            })
                            // console.log(image_id)
                             res.json({result: 1, img: image, image_id: image_id})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
                connection.end();
                // this.connection.releaseConnection()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }

    }
    async updateImage (user, res) {
        try{
            //connecting to the mongodb cloud database
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                this.connection.query(`UPDATE images SET ? WHERE user_id = ${user.user_id} && image_id = ${user.image_id}`, {img:user.img},(err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('image saved');
                            // res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("image insertion failed")
                            res.json({result: 0, err: {insert: "image insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0, err: {insert: "image insertion failed"}});
                    }
                })
            })
        }catch (e) {
            console.log(e);
            // res.json({result: 0, err: {insert: "image insertion failed"}});
        }
    }
    async updateProfImage (user, res) {
        try{
            //connecting to the mongodb cloud database
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                this.connection.query(`UPDATE profimages SET ? WHERE user_id = ${user.user_id} && image_id = ${user.image_id}`, {img:user.img},(err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('image saved');
                            // res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("image insertion failed")
                            res.json({result: 0, err: {insert: "image insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0, err: {insert: "image insertion failed"}});
                    }
                })
            })
        }catch (e) {
            console.log(e);
            // res.json({result: 0, err: {insert: "image insertion failed"}});
        }
    }
}

module.exports = dbConnection;