require('dotenv').config()
const {MongoClient} = require('mongodb');

class dbConnection{
 
    // let client;
    constructor (){
        // this.db.db('Us')
    }
    
    insertuser = async (user) => {
        try{
            //connecting to the mongodb cloud database
            
            let client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
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
        }finally {
            // client.close(); //closing the connection to the database
        }
    }

    checkemails = async (email) => {
        try{
            let client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            
            let ret = await dbdo.findOne({email: email})
            db.close()
            if (ret === null)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }finally {
            // client.close();
        }   
        return 0;
    }

    checkusernames = async (username) => {
        try{
            let client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

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
        }finally {
            // client.close();
        }   
        return 0;
    }

    addmoredetails = async (user) => {
        try{
            let client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

            let db = await client.connect()
            
            const dbdo = db.db("Us").collection("users");
            // dbdo = this.db
            console.log()
            // let ret = await dbdo.update({"username" : user[username]}, {$push: {user}})
            db.close()
            if (ret === null)
                return 1
        }catch (e) {
            console.log(e);
            return 0;
        }finally {
            // client.close();
        }   
        return 0;
    }
}

module.exports = dbConnection;