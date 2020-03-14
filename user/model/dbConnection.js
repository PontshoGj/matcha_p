require('dotenv').config()
const {MongoClient} = require('mongodb');

class dbConnection{
 
    constructor (){
        this.client = new MongoClient("mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true});
    }

    insertuser = (user) => {
        try{
            //connecting to the mongodb cloud database
            this.client.connect((err, db) => {
                if (err) throw err //checking for err in connecting to the database
                
                const dbdo = db.db("Us"); //selecting the dtabase to use

                dbdo.collection("users").insertOne(user, (err, res) => { //selecting the collection/table inside the dtabase i want to use
                    if (err) throw err //checking for err in inserting data to the database

                    console.log("User inserted");
                });
            });
        }catch (e) {
            console.log(err);
            return 0;
        }finally {
            this.client.close(); //closing the connection to the database
        }
        return 1;
    }
}

module.exports = dbConnection;