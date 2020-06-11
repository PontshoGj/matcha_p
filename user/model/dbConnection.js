require('dotenv').config()
let mysql = require('mysql')
// let {res, req} = require('express');
const {MongoClient} = require('mongodb');

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

    async insertuser (user, res) {
        try{
            // connecting to the mongodb cloud database
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                console.log(user);
                this.connection.query('INSERT INTO users SET ?', user, (err, result) => {
                if (!err){
                    if(result.affectedRows){
                        console.log('user saved  aaaaaaa');
                        res.json({result: 1, err: {}});
                        // throw '1'
                    }else{
                        console.log("user insertion failed")
                        res.json({result: 0, err: {insert: "user insertion failed"}});
                    }
                }else{
                    console.log(err);
                    // throw '0'
                }
                })
            })
            .catch(err =>{
                console.log(err)
            })
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});
            // // let db = await client.connect()

            // await client.connect(async (err, db) => {
            //     if (err) throw err //checking for err in connecting to the database
                
            //     const dbdo = db.db("Us").collection("users"); //selecting the dtabase to use
            //     await dbdo.insertOne(user, (err, res) => { //selecting the collection/table inside the dtabase i want to use
            //         if (err) throw err //checking for err in inserting data to the database
            //         console.log("User inserted");
            //     })
            //     // db.close()
            // })
            console.log('qwerty')
            // return 0
        }catch (e) {
            console.log(e);
            // res.json({result: 0, err: {insert: "user insertion faild"}});
        }
        // return 0;
    }

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

    async updateFirstInput (username) {
        try{
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     console.log('inserting users');
            //     console.log(user);
            //     this.connection.query(`INSERT INTO users SET ? WHERE username = ${username}`, user, (err, result) => {
            //     if (!err){
            //         if(result.affectedRows){
            //             console.log('user saved' + s);
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
            const query = { "username": username };
            const update = {
                "$set": {'firstinput': 1} 
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

    async addmoredetails (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log(user.firstname)
                this.connection.query(`UPDATE users SET age = ${user.age}, firstname= \'${user.firstname}\', lastname = \'${user.lastname}\', gender = \'${user.gender}\' WHERE username = \'${user.username}\'`, (err, result) => {
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
            })
           
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

    async updateProfile (user) {
        try{
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            const query = { "username": user.username };
            const update = {
                "$set": {
                    "age": `${user.age}`,
                    "bio": `${user.bio}`,
                    "gender": `${user.gender}`,
                    "interest": `${user.interest}`   
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
    
    async Profile (user) {
        try{
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            const query = { "username": user.username };
            const update = {
                "$set": {
                    "firstname": `${user.firstname}`,
                    "lastname": `${user.lastname}`,
                    "age": `${user.age}`,
                    "bio": `${user.bio}`,
                    "gender": `${user.gender}`,
                    "interest": `${user.interest}`   
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
            })
        }catch (e) {
            console.log(e);
            res.json({result: 0})
        }   
    }

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
            })
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            // let db = await client.connect()
            
            // const dbdo = db.db("Us").collection("users");
            
            // let ret = await dbdo.findOne({username: username})
            // db.close()
            // if (!(ret === null))
            //     return(ret.email);
        }catch (e) {
            console.log(e);
            // return 0;
            res.json({result: 0 ,username: "username does not exist"})
        }   
        // return 0;
    }

    async getInfo(username, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                this.connection.query('SELECT firstname, lastname, age, interest, gender FROM users WHERE username = ?', username, (err, result) => {
                    if (!err){
                        let check = JSON.stringify(result)
                        if(check.localeCompare('[]') !== 0){
                            // console.log(result[0].firstname);
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
            })
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            // let db = await client.connect()
            
            // const dbdo = db.db("Us").collection("users");
            
            // let ret = await dbdo.findOne({username: username})
            // db.close()
            // if (!(ret === null))
            //     return({
            //         "firstname": ret.firstname,
            //         "lastname": ret.lastname,
            //         "age": ret.age,
            //         "interest": ret.interest,
            //         "gender": ret.gender
            //     });
        }catch (e) {
            console.log(e);
            res.json({result: 0 ,username: "username does not exist"})
        }   

    }

    async checkUserLogin(username, password, res) {
        try{
             await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                // console.log(`SELECT id, username, firstinput FROM users WHERE  && `)
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
            })
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            // let db = await client.connect()
            
            // const dbdo = db.db("Us").collection("users");
            
            // let ret = await dbdo.findOne({username: username, password: password})
            // db.close()

            // // console.log(ret)
            // if (ret != null)
            //     return ({result: 1, id: ret._id, username: ret.username, firstinput: ret.firstinput})
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return {result: 0};
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
            })
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async insertFirst (user, res) {
        try{
            await this.connection.getConnection((err) => {
                if (!this.errors(err)) return
                console.log('inserting users');
                // console.log(user);
                let interest = user.interest
                this.connection.query(`UPDATE users SET age = ${user.age}, gender = \'${user.gender}\' WHERE username = \'${user.username}\'`, (err, result) => {
                if (!err){
                    if(result.affectedRows){
                        console.log('user saved');
                        res.json({result:1});
                        // throw '1'
                    }else{
                        res.json({result: 0})
                    }
                }else{
                    console.log(err);
                    // throw '0'
                    res.json({result: 0})
                }
                })
            })
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            // let db = await client.connect()
            
            // const dbdo = db.db("Us").collection("users");
            // const query = { "username": user.username };
            // const update = {
            // "$set": {
            //     "age": `${user.age}`,
            //     "race": `${user.race}`,
            //     "interest": `${user.interest}`,
            //     "gender": `${user.gender}`
            // }
            // };
            // console.log(user.username)
            // const options = { "upsert": false };
            // let ret = await dbdo.updateOne(query, update, options)
            // // console.log(ret.result.n)
            // db.close()
            // if (ret.result.n === 1){
            //     return 1
            // }
            // return 1;
        }catch (e) {
            console.log(e);
            // return 0;
        }   
        // return 0;
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
                })
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            // let db = await client.connect()
            
            // const dbdo = db.db("Us").collection("users");
            // const query = { "username": user.username };
            // const update = {
            //     "$set": {
            //         "fistinput": 1 
            //     } 
            // };
            // const options = { "upsert": false };
            // let ret = await dbdo.updateOne(query, update, options)
            // db.close()
            // if (ret.result.n === 1)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }
}

module.exports = dbConnection;