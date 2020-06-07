require('dotenv').config()
let mysql = require('mysql')

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

    async insertuser (user) {
        try{
            //connecting to the mongodb cloud database
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     console.log('inserting users');
            //     console.log(user);
            //     this.connection.query('INSERT INTO users SET ?', user, (err, result) => {
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
            // let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});
            // let db = await client.connect()

            await client.connect(async (err, db) => {
                if (err) throw err //checking for err in connecting to the database
                
                const dbdo = db.db("Us").collection("users"); //selecting the dtabase to use
                await dbdo.insertOne(user, (err, res) => { //selecting the collection/table inside the dtabase i want to use
                    if (err) throw err //checking for err in inserting data to the database
                    console.log("User inserted");
                })
                // db.close()
            })
            console.log('qwerty')
            return 1
        }catch (e) {
            console.log(e);
            return 0;
        }
        return 0;
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

    async addmoredetails (user) {
        try{
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            const query = { "username": user.username };
            const update = {
            "$set": {
                "age": `${user.age}`,
                "race": `${user.race}`,
                "interest": `${user.interest}`,
                "bio": `${user.bio}`,
                "gender": `${user.gender}`
            }
            };
            const options = { "upsert": false };
            let ret = await dbdo.updateOne(query, update, options)
            // console.log(ret.result.n)
            db.close()
            if (ret.result.n === 1){
                if (await this.updateFirstInput(user.username))
                    return 1
            }
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
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

    async UpdateEmail (user) {
        try{
            
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     console.log('inserting users');
            //     console.log(user);
            //     this.connection.query(`UPDATE users SET email = ? WHERE username = ${user.username}`, user.email, (err, result) => {
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
                    "email": `${user.email}` 
                } 
            };
            const options = { "upsert": false };
            let ret = await dbdo.updateOne(query, update, options)
            db.close()
            if (ret.result.n === 1)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async updatePassword (user) {
        try{
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     console.log('inserting users');
            //     console.log(user);
            //     this.connection.query(`UPDATE users SET password = ? WHERE username = ${user.username}`, user.password, (err, result) => {
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
                    "password": `${user.password}`   
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

    async getemail (username) {
        try{
            //  await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     this.connection.query('SELECT email FROM users WHERE username = ?', username, (err, result) => {
            //         if (!err){
            //             if(result.length > 0){
            //                  console.log('done');
            //                  return result 
            //             }
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
            if (!(ret === null))
                return(ret.email);
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async getInfo(username) {
        try{
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     this.connection.query('SELECT firstname, lastname, age, interest, gender FROM users WHERE username = ?', username, (err, result) => {
            //         if (!err){
            //             if(result.length > 0){
            //                 console.log('done');
            //                 return result({
            //                     "firstname": result.firstname,
            //                     "lastname": result.lastname,
            //                     "age": result.age,
            //                     "interest": result.interest,
            //                     "gender": result.gender
            //                 })
            //             }
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
            if (!(ret === null))
                return({
                    "firstname": ret.firstname,
                    "lastname": ret.lastname,
                    "age": ret.age,
                    "interest": ret.interest,
                    "gender": ret.gender
                });
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async checkUserLogin(username, password) {
        try{
            //  await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     this.connection.query('SELECT id, username, firstinput FROM users WHERE username = ? && password = ?', {username, password}, (err, result) => {
            //         if (!err){
            //             if(result.length > 0){
            //                  console.log('done');
            //                  return ({result: 1, id: result.id, username: result.username, firstinput: result.firstinput}) 
            //             }
            //         }else{
            //             console.log(err);
            //         }
            //     })
            // })
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            
            let ret = await dbdo.findOne({username: username, password: password})
            db.close()

            // console.log(ret)
            if (ret != null)
                return ({result: 1, id: ret._id, username: ret.username, firstinput: ret.firstinput})
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return {result: 0};
    }

    async getbio (username) {
        try{
            // await this.connection.getConnection((err) => {
            //     if (!this.errors(err)) return
            //     this.connection.query('SELECT bio FROM users WHERE username = ?', username, (err, result) => {
            //         if (!err){
            //             if(result.length > 0){
            //                  console.log('done');
            //                  return result.bio 
            //             }
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
            if (!(ret === null)){
                console.log(ret.bio)
                return(ret.bio);}
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async UpdateBio (user) {
        // await this.connection.getConnection((err) => {
        //         if (!this.errors(err)) return
        //         this.connection.query(`UPDATE users SET bio = ? WHERE username = ${user.username}`, user.bio, (err, result) => {
        //             if (!err){
        //                 if(result.length > 0){
        //                      console.log('done');
        //                      return 1 
        //                 }
        //             }else{
        //                 console.log(err);
        //             }
        //         })
        //     })
        try{
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            const query = { "username": user.username };
            const update = {
                "$set": {
                    "bio": `${user.bio}` 
                } 
            };
            const options = { "upsert": false };
            let ret = await dbdo.updateOne(query, update, options)
            db.close()
            if (ret.result.n === 1)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async insertFirst (user) {
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
                        return 1;
                        // throw '1'
                    }
                }else{
                    console.log(err);
                    // throw '0'
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
            return 1;
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }

    async UpdateFirstInput (user) {
        // await this.connection.getConnection((err) => {
        //         if (!this.errors(err)) return
        //         this.connection.query(`UPDATE users SET firstinput = 1 WHERE username = ${user.username}`, (err, result) => {
        //             if (!err){
        //                 if(result.length > 0){
        //                      console.log('done');
        //                      return 1 
        //                 }
        //             }else{
        //                 console.log(err);
        //             }
        //         })
        //     })
        try{
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            const query = { "username": user.username };
            const update = {
                "$set": {
                    "fistinput": 1 
                } 
            };
            const options = { "upsert": false };
            let ret = await dbdo.updateOne(query, update, options)
            db.close()
            if (ret.result.n === 1)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 0;
    }
}

module.exports = dbConnection;