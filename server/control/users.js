const express = require('express');
// const {MongoClient} = require('mongodb');

let router = express.Router();

module.exports = router;


// main = async () => {
//     const uri = "mongodb+srv://Pontsho:Bizhub454@pontshodb-zenb7.mongodb.net/test?retryWrites=true&w=majority"
//     const client = new MongoClient(uri, {useUnifiedTopology: true});
    
//     client.connect(err => {
//         // const collection = client.db("Us").collection("users").find({name: 'Pontsho'});
//         // console.log(collection)
//     // perform actions on the collection object
//         client.close();
//     });
// }
// main()

router.post('/api/update', (req, res) => {
    res.json({result: "update"})
})