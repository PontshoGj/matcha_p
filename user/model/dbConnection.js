require('dotenv').config()
const {MongoClient} = require('mongodb');

class dbConnection{
 
    constructor (){
    }
    
    async insertuser (user) {
        try{
            //connecting to the mongodb cloud database
            
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});
            await client.connect(async (err, db) => {
                if (err) throw err //checking for err in connecting to the database
                
                const dbdo = db.db("Us").collection("users"); //selecting the dtabase to use
                await dbdo.insertOne(user, (err, res) => { //selecting the collection/table inside the dtabase i want to use
                    if (err) throw err //checking for err in inserting data to the database
                    console.log("User inserted");
                })
                // db.close()
            })
            return 1
        }catch (e) {
            console.log(e);
            return 0;
        }
    }

    async checkemails (email) {
        try{
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
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            // dbdo = this.db
            
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
                "boi": `${user.boi}`,
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
                    "boi": `${user.boi}`,
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
                    "boi": `${user.boi}`,
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
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            
            let ret = await dbdo.findOne({username: username, password: password})
            db.close()

            if (ret === null)
                return 0
        }catch (e) {
            console.log(e);
            return 0;
        }   
        return 1;
    }
}

module.exports = dbConnection;