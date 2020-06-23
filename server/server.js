require('dotenv').config()
const express = require('express');
const server = express();
let port = process.env.PORT || 5006;

let mysql = require('mysql')

let connection = mysql.createConnection({
    host     : 'mysql',
    port     : 3306,
    user     : 'root',
    password : 'root',
    connectionLimit : 1000,
})

connection.connect((err) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
            return;
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
            return;
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
            return;
        }
        throw err;
    }
    // console.log(connection);
    connection.query('CREATE DATABASE IF NOT EXISTS matcha');
    console.log('Database matcha created');
    connection.query('USE matcha');
    connection.query('CREATE TABLE IF NOT EXISTS users (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, lastname VARCHAR(100), firstname VARCHAR(100), email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, gender VARCHAR(25) DEFAULT \'Bisexuelle\', bio VARCHAR(1000), interest json DEFAULT NULL, age INT, latidute VARCHAR(255), longitude VARCHAR(255), vf INT DEFAULT 0, firstinput int)');
    console.log('Table users created');
    connection.query('CREATE TABLE IF NOT EXISTS likes (user_id INT(9) UNSIGNED  NOT NULL, friend_id VARCHAR(100) NOT NULL, liked INT(9) NOT NULL)');
    console.log('Table likes created');
    connection.query('CREATE TABLE IF NOT EXISTS friends (user_id INT(9) UNSIGNED  NOT NULL, friend_id VARCHAR(100) NOT NULL)');
    console.log('Table freinds created');
    connection.query('CREATE TABLE IF NOT EXISTS messages (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, sender VARCHAR(100) NOT NULL, message VARCHAR(1000))');
    console.log('Table messages created');
    connection.query('CREATE TABLE IF NOT EXISTS auth(username VARCHAR(100) PRIMARY KEY NOT NULL, token VARCHAR(1000), selec VARCHAR(1000))');
    console.log('Table auth created');
    connection.query('CREATE TABLE IF NOT EXISTS passrest(username VARCHAR(100) PRIMARY KEY NOT NULL, token VARCHAR(1000), selec VARCHAR(1000))');
    console.log('Table passrest created');
    connection.query('CREATE TABLE IF NOT EXISTS images (image_id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,user_id INT(9) NOT NULL, img LONGBLOB NOT NULL)')
    console.log("Table images created");
    connection.end();
    return;
});
server.listen(port, () => {console.log(`User Running on Port ${port}`)})
