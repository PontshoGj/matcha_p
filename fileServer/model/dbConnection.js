require('dotenv').config()
const {MongoClient} = require('mongodb');

class dbConnection{
 
    constructor (){
    }
    
    async insertImage (user) {
        try{
            //connecting to the mongodb cloud database
            
            let client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
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
}

module.exports = dbConnection;