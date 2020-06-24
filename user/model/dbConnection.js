require('dotenv').config()
let mysql = require('mysql')
// let {res, req} = require('express');
const {MongoClient} = require('mongodb');
const email= require('./sendEmail')
const uuid = require('uuid/v1');
const { use } = require('../control/like');

class dbConnection{
 
    constructor (){
        this.connection =  mysql.createPool({
            host     : 'mysql',
            port     : 3306,
            user     : 'root',
            password : 'root',
            database : 'matcha',
            connectionLimit: 1000000
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

    async insertuser (user, res) {
        try{
            let uid = uuid()
            let uid2 = uuid();
            // connecting to the mongodb cloud database
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                console.log(user);
                this.connection.query('INSERT INTO users SET ?', user, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            // console.log('user saved  aaaaaaa');
                            let str = 'http://localhost:3000/Valid?token='+uid +'&selec='+uid2;
                            let mail = new email()
                            mail.sendmails(user.email, `<a href="${str}">Validate</a>`, "Account confirmation mail")

                            res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("user insertion failed")
                            res.json({result: 0, err: {insert: "user insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0, err: {insert: "user insertion failed"}});
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0, err: {insert: "user insertion faild"}});
        }
    }
    //
    async checkemails (email) {
        try{
            //  await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     this.connection.query('SELECT email FROM users WHERE email = ?', email, (err, result) => {
            //         if (!err){
            //             if(result.length > 0)
            //                 console.log('done');
            //         }else{
            //             console.log(err);
            //         }
            //     })
            // })
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            
            let ret = await dbdo.findOne({email: email})
            db.close()
            if (ret === null)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }
    //
    async checkusernames (username) {
        try{
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     this.connection.query('SELECT username FROM users WHERE username = ?', username, (err, result) => {
            //         if (!err){
            //             if(result.length > 0)
            //                 console.log("done")
            //         }else{
            //             console.log(err);
            //         }
            //     })
            // })
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            
            let ret = await dbdo.findOne({username: username})
            db.close()
            if (ret === null)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async addmoredetails (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log(user)
                this.connection.query(`UPDATE users SET age = ${user.age}, firstname= \'${user.firstname}\', lastname = \'${user.lastname}\', gender = \'${user.gender}\', interest = \'${user.interest}\' WHERE username = \'${user.username}\'`, (err, result) => {
                    if (!err){
                        // console.log(result.affectedRows)
                        if(result.affectedRows){
                             console.log('done');
                             res.json({result: 1}) 
                        }else{
                            console.log("info not updated not updated")
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                })
                // this.connection.end()
            })
           
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async UpdateEmail (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('updating email');
                // console.log(user);
                this.connection.query(`UPDATE users SET email = ? WHERE username = \'${user.username}\'`, user.email, (err, result) => {
                if (!err){
                    if(result.affectedRows){
                        console.log('email updated');
                        res.json({result: 1})
                    }else{
                        res.json({result : 1})
                    }
                }else{
                    console.log(err);
                    res.json({result: 1})
                }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 1})
        }   
    }

    async updatePassword (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('updating password');
                this.connection.query(`UPDATE users SET password = \'${user.password}\' WHERE username = \'${user.username}\'`, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('password updated');
                            res.json({result: 1})
                        }else{
                            console.log('password not updated')
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    //
    async updateUsername (user) {
        try{
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     console.log('inserting users');
            //     console.log(user);
            //     this.connection.query(`UPDATE INTO users SET username = ? WHERE username = ${user.username}`, user.username, (err, result) => {
            //     if (!err){
            //         if(result.affectedRows){
            //             console.log('user saved');
            //             return 1;
            //             // throw '1'
            //         }
            //     }else{
            //         console.log(err);
            //         // throw '0'
            //     }
            //     })
            // })
            // .catch(err =>{
            //     console.log(err)
            // })
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            const query = { "username": user.username };
            const update = {
                "$set": {
                    "username": `${user.username}`   
                } 
            };
            const options = { "upsert": false };
            let ret = await dbdo.updateOne(query, update, options)
            // console.log(ret)
            db.close()
            if (ret.result.n === 1)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async getemail (username, res) {
        try{
             await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`SELECT email FROM users WHERE username = \'${username}\'`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                            //  console.log(result);
                             res.json({result: 1, email: result[0].email})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }

    async getInfo(username, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query('SELECT firstname, lastname, age, interest, gender FROM users WHERE username = ?', username, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                                res.json({result: 1,userinfo: {
                                "firstname": result[0].firstname,
                                "lastname": result[0].lastname,
                                "age": result[0].age,
                                "interest": result[0].interest,
                                "gender": result[0].gender
                            }})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }

    }

    async getMatcha(user_id, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query('SELECT interest, latidute, longitude FROM users WHERE id = ?', user_id, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                                res.json({result: 1,userinfo: {
                                "interest": result[0].interest,
                                "latidute": result[0].latidue,
                                "longitude": result[0].longitude,
                                "latidute": result[0].latidute
                            }})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }

    }

    async checkUserLogin(username, password, res) {
        try{
             await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`SELECT id, username, firstinput FROM users WHERE password = \'${password}\' AND username = \'${username}\'`, (err, result) => {
                    if (!err){
                        console.log(result)
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                             console.log('done');
                             res.json({result: 1, id: result[0].id, username: result[0].username, firstinput: result[0].firstinput}) 
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async getbio (username, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`SELECT bio FROM users WHERE username = \'${username}\'`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                            //  console.log(result);
                             res.json({result: 1, userinfo: result[0].bio})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }

    async UpdateBio (user, res) {

        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`UPDATE users SET bio = ? WHERE username = \'${user.username}\'`, user.bio, (err, result) => {
                    if (!err){
                        // console.log(result.affectedRows)
                        if(result.affectedRows){
                             console.log('done');
                             res.json({result: 1}) 
                        }else{
                            console.log("bio not updated")
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async insertFirst (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                let interest = user.interest
                this.connection.query(`UPDATE users SET age = ${user.age}, gender = \'${user.gender}\', interest = \'${interest}\' WHERE username = \'${user.username}\'`, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('user saved');
                            res.json({result:1});
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async UpdateFirstInput (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`UPDATE users SET firstinput = 1 WHERE username = \'${user}\'`, (err, result) => {
                    if (!err){
                        console.log(result)
                        if(result.affectedRows){
                                console.log('done');
                                res.json({result: 1}) 
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async insertLike (user, frnd,res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query(`INSERT INTO friends SET user_id = ${user}, friend_id = ${frnd}`, (err, result) => {
                    if (!err){
                        console.log(result)
                        if(result.affectedRows){
                                console.log('done');
                                res.json({result: 1}) 
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                })
                // this.connection.end()
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    Friends (user_id, res) {
        try{
            let users = new Promise( async (resolve, reject) =>{
                await this.connection.getConnection((err) => {
                    if (!this.errors(err)) return
                    this.connection.query(`SELECT * FROM friends WHERE user_id = \'${user_id}\'`, (err, result) => {
                        if (!err){
                            let check = JSON.stringify(result)
                            if(check.localeCompare('[]') !== 0){
                                //  console.log(result);
                                 resolve({result: 1, userinfo: result})
                            }else{
                                reject({result: 0 ,username: "username does not exist"})
                            }
                        }else{
                            console.log(err);
                            resolve({result: 0 ,username: "username does not exist"})
                        }
                    })
                    // this.connection.end()
                })
            })
            users.then(async data =>{
                user_id = data.userinfo.map(friend_id => `id = ${friend_id.friend_id}`)
                user_id = user_id.join(" || ")
                await this.connection.getConnection((err) => {
                    if (!this.errors(err)) return
                    this.connection.query(`SELECT * FROM users WHERE  ${user_id}`, (err, result) => {
                        if (!err){
                            let check = JSON.stringify(result)
                            if(check.localeCompare('[]') !== 0){
                                //  console.log(result);
                                 res.json({result: 1, userinfo: result})
                            }else{
                                console.log(err)
                                res.json({result: 0 ,username: "username does not exist"})
                            }
                        }else{
                            console.log(err);
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    })
                    // this.connection.end()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }
}

module.exports = dbConnection;