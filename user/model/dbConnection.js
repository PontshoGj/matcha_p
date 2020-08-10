require('dotenv').config()
let mysql = require('mysql')
// let {res, req} = require('express');
const {MongoClient} = require('mongodb');
const email= require('./sendEmail')
const uuid = require('uuid/v1');
const process = require('process');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const { use } = require('../control/likes');

class dbConnection{
 
    constructor (){
        this.connection =  mysql.createPool({
            host     : 'mysql',
            port     : 3306,
            user     : 'root',
            password : 'root',
            database : 'matcha',
            // connectionLimit: 1000000
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
            }else {
                console.log(err);
                process.exit(1)
            }
        }
        return 1;
    }

    async insertuser (user, res) {
        try{
            let uid = uuid()
            let uid2 = uuid();
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            // connecting to the mongodb cloud database
            await connection.connect((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                // console.log(user);
                connection.query('INSERT INTO users SET ?', user, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            // console.log('user saved  aaaaaaa');
                            let str = 'http://localhost:3000/Valid?token='+uid +'&selec='+uid2;
                            let mail = new email()
                            mail.sendmails(user.email, `<a href="${str}">Validate</a>`, "Account confirmation mail")
                            connection.query(`INSERT INTO auth SET id = ${result.insertId}, token = \'${uid}\', selec = \'${uid2}\'`, user, (err, result) => {
                                if (err)
                                    console.log(err)
                            })
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
                    //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0, err: {insert: "user insertion faild"}});
        }
    }
    //
    async checkemails (email) {
        try{
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            let users = new Promise( async (resolve, reject) =>{

                await connection.connect((err) => {
                    if (!this.errors(err)) return
                    connection.query('SELECT email FROM users WHERE email = ?', email, (err, result) => {
                        if (!err){
                            if(result.length > 0){
                                console.log('done');
                                resolve({result: 1})
                            }else{
                                resolve({result: 0})
                            }
                        }else{
                            reject({result: 0})
                            console.log(err);
                        }
                    })
                })
            })
            let info = await users

            if (info.result === 0)
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
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            let users = new Promise(async(resolve, reject)=>{
                await connection.connect((err) => {
                    if (!this.errors(err)) return
                    connection.query('SELECT username FROM users WHERE username = ?', username, (err, result) => {
                        if (!err){
                            if(result.length > 0){
                                resolve({result: 1})
                                // console.log("done")
                            }else{

                                resolve({result: 0})
                            }
                        }else{
                            reject({result: 0})
                            console.log(err);
                        }
                    })
                })
            })
            let info = await users
            // console.log(info.result)
            if (info.result === 0){
                return 1
            }
          
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async addmoredetails (user, res) {
        let connection = mysql.createConnection({
            host     : 'mysql',
            database : 'matcha',
            port     : 3306,
            user     : 'root',
            password : 'root',
            connectionLimit : 1000000,
        })
        try{
            await connection.connect((err) => {
                if (!this.errors(err)) return
                console.log(user)
                connection.query(`UPDATE users SET age = ${user.age}, firstname= \'${user.firstname}\', lastname = \'${user.lastname}\', gender = \'${user.gender}\', interest = \'${user.interest}\' WHERE username = \'${user.username}\'`, (err, result) => {
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
                    //this.connection.end()()
                })
            })
           
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async UpdateEmail (user, res) {
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
                console.log('updating email');
                // console.log(user);
                connection.query(`UPDATE users SET email = ? WHERE username = \'${user.username}\'`, user.email, (err, result) => {
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
                //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 1})
        }   
    }

    async updatePassword (user, res) {
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
                console.log('updating password');
                // const salt = bcrypt.genSaltSync(saltRounds)

                connection.query(`UPDATE users SET password = \'${bcrypt.hashSync(user.password, '$2b$10$p.PzXS7RehUETHIinopsl.')}\' WHERE username = \'${user.username}\'`, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('password updated');
                            mail.sendmails(user.email, `<a href="${str}">Validate</a>`, "Password Reset")
                            res.json({result: 1})
                        }else{
                            console.log('password not updated')
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                    //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async updatePassword2 (emails, res) {
        try{
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 100000000,
            })
            await connection.connect((err) => {
                if (!this.errors(err)) return
                console.log('updating password');
                let password = '321lll;;;LLL'
                // const salt = bcrypt.genSaltSync(saltRounds)
                password = bcrypt.hashSync(password, '$2b$10$p.PzXS7RehUETHIinopsl.')
                connection.query(`UPDATE users SET password = \'${password}\' WHERE email = \'${emails}\'`, (err, result) => {
                    if (!err){
                        if(result.affectedRows){
                            console.log('password updated');
                            let str = `new password 321lll;;;LLL`
                            let mail = new email()
                            mail.sendmails(emails, str, "Password Reset")
                            res.json({result: 1})
                        }else{
                            console.log('password not updated')
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                    //this.connection.end()()
                })
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
                connection.query(`SELECT email FROM users WHERE username = \'${username}\'`, (err, result) => {
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
                    //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }

    async getInfo(username, res) {
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
                connection.query('SELECT firstname, lastname, age, interest, gender FROM users WHERE username = ?', username, (err, result) => {
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
                    connection.end()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }

    }

    async getMatcha(user_id, res) {
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
                connection.query('SELECT interest, latidute, longitude, gender, age, minage, maxage, distance FROM users WHERE id = ?', user_id, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                                res.json({result: 1,userinfo: {
                                "interest": result[0].interest,
                                "latidute": result[0].latidue,
                                "longitude": result[0].longitude,
                                "latidute": result[0].latidute,
                                "age": result[0].age,
                                "gender": result[0].gender,
                                "distance": result[0].distance,
                                "minage": result[0].minage,
                                "maxage": result[0].maxage
                            }})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                    connection.end()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }

    }

    async checkUserLogin(username, password, res) {
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
                const salt = bcrypt.genSaltSync(saltRounds)
                // ${bcrypt.hashSync(password, salt)}
                const pass = bcrypt.hashSync(password, '$2b$10$p.PzXS7RehUETHIinopsl.')
                connection.query(`SELECT id, username, firstinput, vf FROM users WHERE password = \'${pass}\' AND username = \'${username}\'`, (err, result) => {
                    if (!err){
                        // console.log(result)
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                             console.log('done');
                             res.json({result: 1, id: result[0].id, username: result[0].username, firstinput: result[0].firstinput, vf: result[0].vf}) 
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                    }
                    // //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async getbio (username, res) {
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
                connection.query(`SELECT bio FROM users WHERE username = \'${username}\'`, (err, result) => {
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
                    // //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }

    async UpdateBio (user, res) {

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
                connection.query(`UPDATE users SET bio = ? WHERE username = \'${user.username}\'`, user.bio, (err, result) => {
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
                    // //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async insertFirst (user, res) {
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
                console.log('inserting users');
                let interest = user.interest
                connection.query(`UPDATE users SET age = ${user.age}, gender = \'${user.gender}\', interest = \'${interest}\', distance = ${user.distance}, maxage = ${user.maxage}, minage = ${user.minage} WHERE username = \'${user.username}\'`, (err, result) => {
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
                    // //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async UpdateFirstInput (user, res) {
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
                connection.query(`UPDATE users SET firstinput = 1 WHERE username = \'${user}\'`, (err, result) => {
                    if (!err){
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
                    ////this.connection.end()()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async insertLike (user, frnd,res) {
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
                connection.query(`INSERT INTO likes SET user_id = ${user}, friend_id = \'${frnd}\', liked = 1`, (err, result) => {
                    if (!err){
                        // console.log(result)
                        if(result.affectedRows){
                                console.log('done');
                                connection.query(`UPDATE users SET tlike = tlike + 1 WHERE id = ${frnd}`, (err, result) => {
                                    if (!err){
                                        // console.log(result)
                                        res.json({result: 1}) 
                                    }else{
                                        res.json({result: 0})

                                    }
                                })
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                    ////this.connection.end()()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async insertdisLike (user, frnd,res) {
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
                connection.query(`INSERT INTO likes SET user_id = ${user}, friend_id = \'${frnd}\', liked = 0`, (err, result) => {
                    // connection.query(`UPDATE likes SET liked = 0 WHERE user_id = ${frnd} AND friend_id = \'${user}\'`, (err, result) => {
                    if (!err){
                        // console.log(result)
                        if(result.affectedRows){
                                console.log('done');
                                connection.query(`UPDATE users SET tdislike = tdislike + 1 WHERE id = ${frnd}`, (err, result) => {
                                    if (!err){
                                        // console.log(result)
                                        res.json({result: 1}) 
                                    }else{
                                        res.json({result: 0})

                                    }
                                })
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                    ////this.connection.end()()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }
    async insertdisLike2 (user, frnd,res) {
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
                // connection.query(`INSERT INTO likes SET user_id = ${user}, friend_id = \'${frnd}\', liked = 0`, (err, result) => {
                    connection.query(`UPDATE likes SET liked = 0 WHERE user_id = ${frnd} AND friend_id = \'${user}\'`, (err, result) => {
                    if (!err){
                        // console.log(result)
                        if(result.affectedRows){
                                console.log('done');
                                connection.query(`UPDATE users SET tdislike = tdislike + 1 WHERE id = ${frnd}`, (err, result) => {
                                    if (!err){
                                        // console.log(result)
                                        res.json({result: 1}) 
                                    }else{
                                        res.json({result: 0})

                                    }
                                })
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                    ////this.connection.end()()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }
    async addFriend (user, frnd,res) {
        try{
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            let users = new Promise( async (resolve, reject) =>{
                await connection.connect((err) => {
                    if (!this.errors(err)) return
                    connection.query(`INSERT INTO friends SET user_id = ${user}, friend_id = \'${frnd}\'`, (err, result) => {
                        if (!err){
                            // console.log(result)
                            if(result.affectedRows){
                                console.log('done');
                                connection.query(`INSERT INTO friends SET user_id = ${frnd}, friend_id = \'${user}\'`, (err, result) => {
                                    if (!err){
                                        if (result.affectedRows){
                                            resolve({result: 1}) 
                                        }
                                    }else{
                                        console.log(err)
                                        resolve({result: 0})
                                    }
                                })
                            }else{
                                console.log(err)
                                reject({result: 0})
                            }
                        }else{
                            console.log(err);
                            reject({result: 0})
                        }
                    })
                    // ////this.connection.end()()()
                })
            })
            users.then(async data =>{
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
                    connection.query(`DELETE FROM likes WHERE  user_id = ${frnd} && friend_id = ${user}`, (err, result) => {
                        if (!err){
                            let check = JSON.stringify(result)
                            // console.log(result)
                            if(check.localeCompare('[]') !== 0){
                                console.log('user deleted')
                                //  console.log(result);
                                 res.json({result: 1, })
                            }else{
                                console.log(err)
                                res.json({result: 0 ,username: "username does not exist"})
                            }
                        }else{
                            console.log(err);
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                        ////this.connection.end()()()
                    })
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }


    async Friends (user_id, res) {
        try{
            let users = new Promise( async (resolve, reject) =>{
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
                    connection.query(`SELECT * FROM friends WHERE user_id = \'${user_id}\'`, (err, result) => {
                        if (!err){
                            let check = JSON.stringify(result)
                            if(check.localeCompare('[]') !== 0){
                                //  console.log(result);
                                 resolve({result: 1, userinfo: result})
                            }else{
                                resolve({result: 0 ,username: "username does not exist"})
                            }
                        }else{
                            console.log(err);
                            resolve({result: 0 ,username: "username does not exist"})
                        }
                        // ////this.connection.end()()()
                        connection.end()
                    })
                })
            })
            users.then(async data =>{
                if (data.result){
                    let connection = mysql.createConnection({
                        host     : 'mysql',
                        database : 'matcha',
                        port     : 3306,
                        user     : 'root',
                        password : 'root',
                        connectionLimit : 1000000,
                    })
                    user_id = data.userinfo.map(friend_id => `id = ${friend_id.friend_id}`)
                    user_id = user_id.join(" || ")
                    await connection.connect((err) => {
                        if (!this.errors(err)) return
                        connection.query(`SELECT * FROM users WHERE  ${user_id}`, (err, result) => {
                            if (!err){
                                let check = JSON.stringify(result)
                                if(check.localeCompare('[]') !== 0){
                                    //  console.log(result);
                                    // result.userinfo.user_id = user_id
                                    // console.log(result)
                                    res.json({result: 1, userinfo: result})
                                }else{
                                    console.log(err)
                                    res.json({result: 0 ,username: "username does not exist"})
                                }
                            }else{
                                console.log(err);
                                res.json({result: 0 ,username: "username does not exist"})
                            }
                            connection.end()
                        })
                    })
                }else{
                    res.json({result: 0 ,username: "username does not exist"})
                }
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }
    async delefri (frnd, user, res) {
        try{
            let uid = uuid()
            // connecting to the mongodb cloud database
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
                connection.query(`DELETE FROM friends WHERE  user_id = ${frnd} && friend_id = ${user} || user_id = ${user} && friend_id = ${frnd}`, (err, result) => {                    if (!err){
                        // console.log(result)
                        if(result.affectedRows){
                            // console.log(result)
                            console.log('user saved  aaaaaaa');
                            res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("loaction insertion failed")
                            res.json({result: 0, err: {insert: "location insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0, err: {insert: "location insertion failed"}});
                    }
                    //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0, err: {insert: "location insertion faild"}});
        }
    }
    async Fri (user_id, res) {
        try{
            let users = new Promise( async (resolve, reject) =>{
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
                    connection.query(`SELECT * FROM likes WHERE friend_id = \'${user_id}\' && liked = 1`, (err, result) => {
                        if (!err){
                            let check = JSON.stringify(result)
                            if(check.localeCompare('[]') !== 0){
                                //  console.log(result);
                                 resolve({result: 1, userinfo: result})
                            }else{
                                resolve({result: 0 ,username: "username does not exist"})
                            }
                        }else{
                            console.log(err);
                            resolve({result: 0 ,username: "username does not exist"})
                        }
                    })
                    // //this.connection.end()()
                })
            })
            users.then(async data =>{
                // console.log(data.userinfo)
                let connection = mysql.createConnection({
                    host     : 'mysql',
                    database : 'matcha',
                    port     : 3306,
                    user     : 'root',
                    password : 'root',
                    connectionLimit : 1000000,
                })
                if (data.result){
                    user_id = data.userinfo.map(friend_id => `id = ${friend_id.user_id}`)
                    user_id = user_id.join(" || ")
                    // console.log(user_id)
                    await connection.connect((err) => {
                        if (!this.errors(err)) return
                        connection.query(`SELECT * FROM users WHERE  ${user_id}`, (err, result) => {
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
                            //this.connection.end()()
                        })
                    })
                }else{
                    res.json({result: 0 ,username: "username does not exist"})
                }
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   
    }
    async saveloc (lat, lng, user_id, res) {
        try{
            let uid = uuid()
            // connecting to the mongodb cloud database
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
                console.log('inserting location');
                connection.query(`UPDATE users SET latidute = ${lat}, longitude = ${lng} WHERE id = ${user_id}`, (err, result) => {
                    if (!err){
                        // console.log(result)
                        if(result.affectedRows){
                            // console.log(result)
                            // console.log('user saved  aaaaaaa');
                            res.json({result: 1, err: {}});
                            // throw '1'
                        }else{
                            console.log("loaction insertion failed")
                            res.json({result: 0, err: {insert: "location insertion failed"}});
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0, err: {insert: "location insertion failed"}});
                    }
                    //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0, err: {insert: "location insertion faild"}});
        }
    }
    async getloc(userid, res){
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
                connection.query(`SELECT latidute, longitude FROM users WHERE id = \'${userid}\'`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        // console.log(result)
                        if(check.localeCompare('[]') !== 0){
                            //  console.log(result);
                             res.json({result: 1, lat: result[0].latidute,lng: result[0].longitude})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                    //this.connection.end()()
                })
            })
        }catch (e){

        }
    }

    async updateloc(userid, lat, lng, res){
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
                connection.query(`UPDATE users SET latidute = ${lat}, longitude = ${lng} WHERE id = ${userid}`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        // console.log(result)
                        if(check.localeCompare('[]') !== 0){
                            //  console.log(result);
                             res.json({result: 1})
                        }else{
                            res.json({result: 0 ,username: "username does not exist"})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0 ,username: "username does not exist"})
                    }
                    //this.connection.end()()
                })
            })
        }catch (e){

        }
    }

    async updateAccount (token, selec, res) {
        try{
            let uid = uuid()
            let uid2 = uuid();
            let connection = mysql.createConnection({
                host     : 'mysql',
                database : 'matcha',
                port     : 3306,
                user     : 'root',
                password : 'root',
                connectionLimit : 1000000,
            })
            // connecting to the mongodb cloud database
            await connection.connect((err) => {
                if (!this.errors(err)) return
                connection.query(`SELECT id FROM auth WHERE token = \'${token}\' && selec = \'${selec}\'`, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                            let id = result[0].id
                            connection.query(`UPDATE users SET vf = 1 WHERE id = ${id}`, (err, result) => {
                                if (!err){
                                    // console.log(result)
                                    if(result.affectedRows){
                                        connection.query(`DELETE FROM auth  WHERE id = ${id}`, (err, result) => {
                                            if (!err){
                                                // console.log(result)
                                                if(result.affectedRows){
                                                    res.json({result: 1})
                                                }
                                                else{
                                                    res.json({result: 0})
                                                }
                                            }else{
                                                res.json({result: 0})
                                            }
                                        })
                                    }else{
                                        res.json({result: 0})
                                    }
                                }else{
                                    res.json({result: 0})
                                }
                            })
                        }else{
                            res.json({result: 0})
                        }
                    }else{
                        console.log(err);
                        res.json({result: 0})
                    }
                    //this.connection.end()()
                })
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }
    }
}

module.exports = dbConnection;