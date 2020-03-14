require('dotenv').config()
const {MongoClient} = require('mongodb');

class dbConnection{
 
    constructor (){
        this.client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true});
    }

    insertuser = (user) => {
        try{
            console.log(user)
            this.client.connect((err, db) => {
                if (err) throw err
                
                const dbdo = db.db("Us");

                dbdo.collection("users").insertOne(user, (err, res) => {
                    if (err) throw err

                    console.log("User inserted");
                });
            });
        }catch (e) {
            console.log(err);
            return 0;
        }finally {
            db.close();
        }
        return 1;
    }
}

module.exports = dbConnection;