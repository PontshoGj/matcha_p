const express = require('express');
const {MongoClient} = require('mongodb');

let router = express.Router();

module.exports = router;


main = async () => {
    const uri = "mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority"
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        // Connect to the MongoDB cluster
        await client.connect(err => {
            if (err)
                console.log(err)
            else
                console.log("connected")
        });
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

listDatabases = async (client) => {
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main()

router.post('/api/update', (req, res) => {
    res.json({result: "update"})
})