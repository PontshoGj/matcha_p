require('dotenv').config()
const express = require('express');
const server = express();
const bcrypt = require('bcrypt');
const process = require('process');
let port = process.env.PORT || 5006;
const fs = require('fs')
const saltRounds = 10;


let mysql = require('mysql')

let connection = mysql.createConnection({
    host     : 'mysql',
    // host     :  'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    connectionLimit : 1000,
})

connection.connect((err) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
            process.exit(1)
            // return;
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
            process.exit(1)
            // return;
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
            process.exit(1)
            // return;
        }
        console.log(err);
        process.exit(1)
    }
    // console.log(connection);
    connection.query('CREATE DATABASE IF NOT EXISTS matcha');
    console.log('Database matcha created');
    connection.query('USE matcha');
    connection.query('CREATE TABLE IF NOT EXISTS users (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, lastname VARCHAR(100), firstname VARCHAR(100), email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, gender VARCHAR(25) DEFAULT \'Bisexuelle\', bio VARCHAR(1000), interest json DEFAULT NULL, age INT, maxage INT DEFAULT 88, minage INT DEFAULT 18,latidute VARCHAR(255), longitude VARCHAR(255), distance INT DEFAULT 1,vf INT DEFAULT 0, firstinput int, tlike INT DEFAULT 0, tdislike INT DEFAULT 0, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
    console.log('Table users created');
    connection.query('CREATE TABLE IF NOT EXISTS likes (user_id INT(9) UNSIGNED  NOT NULL, friend_id VARCHAR(100) NOT NULL, liked INT(9) NOT NULL)');
    console.log('Table likes created');
    connection.query('CREATE TABLE IF NOT EXISTS friends (user_id INT(9) UNSIGNED  NOT NULL, friend_id VARCHAR(100) NOT NULL)');
    console.log('Table freinds created');
    connection.query('CREATE TABLE IF NOT EXISTS messages (froms INT(9) UNSIGNED NOT NULL, tos INT(9) UNSIGNED NOT NULL, message VARCHAR(1000), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
    console.log('Table messages created');
    connection.query('CREATE TABLE IF NOT EXISTS auth(id INT(9) UNSIGNED PRIMARY KEY NOT NULL, token VARCHAR(1000), selec VARCHAR(1000))');
    console.log('Table auth created');
    connection.query('CREATE TABLE IF NOT EXISTS passrest(id INT(9) UNSIGNED PRIMARY KEY NOT NULL, token VARCHAR(1000), selec VARCHAR(1000))');
    console.log('Table passrest created');
    connection.query('CREATE TABLE IF NOT EXISTS images (image_id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,user_id INT(9) NOT NULL, img LONGBLOB NOT NULL, num INT(9))')
    console.log("Table images created");
    connection.query('CREATE TABLE IF NOT EXISTS profimage (image_id INT(9) UNSIGNED  NOT NULL,user_id INT(9) NOT NULL, img LONGBLOB NOT NULL)')
    console.log("Table images created");
    connection.query('CREATE TABLE IF NOT EXISTS notif (user_id INT(9) UNSIGNED  NOT NULL, friend_id VARCHAR(100) NOT NULL, value VARCHAR(100) NOT NULL)');
    console.log("Table notif created");



    connection.query(`SELECT * FROM images`, (err, result) => {
        if (!err){
            let check = JSON.stringify(result)
            if (check.localeCompare('[]') === 0){
                    let j = 1
                    img = fs.readFileSync('download.jpeg')
                    for(let i = 1; i <= 500; i++){
                        connection.query(`INSERT INTO profimage set image_id = ${j}, user_id = ${i}, img = ?`, img)   
                        j += 5
                    }
                    console.log("right")

            }else{
                console.log("database has profile pics")
            }
        }else{
            console.log(err)
        }
    })

    connection.query(`SELECT * FROM profimage`, (err, result) => {
        if (!err){
            let check = JSON.stringify(result)
            if (check.localeCompare('[]') === 0){
                    img = fs.readFileSync('download.jpeg')
                    for(let i = 1; i <= 500; i++){
                        for(let j = 0; j < 5; j++){
                            connection.query(`INSERT INTO images set user_id = ${i}, img = ?`, img)   
                        }
                    }
                    console.log("right")
            }else{
                console.log("database has profile pics")
            }
        }else{
            console.log(err)
        }
    })
    // const password = bcrypt.hashSync("LLL;;;lll123", '$2b$10$p.PzXS7RehUETHIinopsl.')
    // console.log(password)
    // fs.readFile('./file.json', (err, fileData) => {
    //     if (err) {
    //         console.log(err)
    //     }else{
    //         try {
    //             const object = JSON.parse(fileData)
    //             console.log(object)
    //             // const newobject = object.map(ob => {
    //             //     let x = Math.floor((Math.random() * 1000) + 1)
    //             //     ob.tlike = x
    //             //     let y = Math.floor((Math.random() * 1000) + 1)
    //             //     ob.tdislike = y
    //             //     return ob
    //             // })
    //             const gend = ["male", "female", "gay", "lesbian", "Bisexuelle"]
    //             let i = 0
    //             const newobject = object.map(ob => {
    //                 // let x = Math.floor((Math.random() * 3) + 1)
    //                 // console.log(x)
    //                 ob.gender = gend[i]
    //                 i++
    //                 if (i === 5)
    //                     i = 0
    //                 return ob
    //             })
    //             // let r_earth = 6371
    //             // let i = 1
    //             // const newobject = object.map(ob => {
    //             //     ob.latidute = ob.latidute + (i++ / r_earth) * (180 / 3.145)
    //             //     ob.longitude = ob.longitude + (i++ / r_earth) * (180 / 3.145)
    //             //     return ob
    //             // })
    //             // const newobject = object.map(ob => {
    //             //     ob.password = password
    //             //     return ob
    //             // })
    //             // console.log(newobject)
    //             // console.log(newobject.toString())
    //             const objects = JSON.stringify(newobject)
    //             // fs.writeFile("file.json", newobject,err => {
    //             //     if (err) {
    //             //         console.log('Error writing file', err)
    //             //     } else {
    //             //         console.log('Successfully wrote file')
    //             //     }
    //             // })
    //             // console.log(objects)
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }
    // })
    // let r_earth = 6371
    // latitude + (distance / r_earth) * (180 / 3.145)
    connection.query(`SELECT * FROM users`, (err, result) => {
        if (!err){
            let check = JSON.stringify(result)
            if (check.localeCompare('[]') === 0){
                // fs. writeFile("file.json", check,err => {
                //     if (err) {
                //         console.log('Error writing file', err)
                //     } else {
                //         console.log('Successfully wrote file')
                //     }
                // })
                // console.log(result)
                fs.readFile('./file.json', (err, fileData) => {
                    if (err) {
                        console.log(err)
                    }else{
                        try {
                            const object = JSON.parse(fileData)
                            // console.log(object)
                            object.map(ob =>{
                                connection.query('INSERT INTO users SET ?', ob, (err, result) => {
                                    if (!err){
                                        if (result.affectedRows){
                                            // console.log("right")
                                        }
                                    }else{
                                        console.log(err)
                                    }
                                })
                            })
                            console.log("right")
                        } catch(err) {
                            console.log(err)
                        }
                    }
                })
            }else{
                console.log("database has users")
            }
        }else{
            console.log(err)
        }
    })
    // connection.end();
    return;
});
server.listen(port, () => {console.log(`User Running on Port ${port}`)})
