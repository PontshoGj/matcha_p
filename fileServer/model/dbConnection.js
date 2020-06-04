require('dotenv').config()
const {MongoClient} = require('mongodb');

class dbConnection{
 
    constructor (){
    }
    
    async insertImage (user) {
        try{
            //connecting to the mongodb cloud database
            
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});
            await client.connect(async (err, db) => {
                if (err) throw err //checking for err in connecting to the database
                
                const dbdo = db.db("Image").collection("Images"); //selecting the dtabase to use
                await dbdo.insertOne(user, (err, res) => { //selecting the collection/table inside the dtabase i want to use
                    if (err) throw err //checking for err in inserting data to the database
                    console.log("Image inserted");
                })
                // db.close()
            })
            return 1
        }catch (e) {
            console.log(e);
            return 0;
        }
    }
    async getImage (user) {
        try{
            //connecting to the mongodb cloud database
            
            let client = new MongoClient('mongodb://mongo:127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});
            let db = await client.connect()
            const dbdo = db.db("Image").collection("Images"); //selecting the dtabase to use
            
            let ret = await dbdo.find({userid: user.userid})
            db.close()
            console.log(ret)
            return 1
        }catch (e) {
            console.log(e);
            return 0;
        }
    }
}

module.exports = dbConnection;