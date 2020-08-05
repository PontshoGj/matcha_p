// require('dotenv').config()
let mysql = require('mysql');
const { json } = require('express');

class dbConnection{
 
    constructor (){
        this.connection =  mysql.createConnection({
            host     : 'mysql',
            port     : 3306,
            user     : 'root',
            password : 'root',
            database : 'matcha',
            connectionLimit: 10
        })
    }

    //database errors
    errors (err) {
        if (err){
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.');
                return 0;
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.');
                return 0;
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.');
                return 0;
            }
            throw err;
        }
        return 1;
    }

    //getting mathed user 
    async getMatch(interest, longitud, latitud, minage, maxage, gender, distance, user_id, res){

        try {
            let users = new Promise( async (resolve, reject) =>{
                let connection =  mysql.createConnection({
                    host     : 'mysql',
                    port     : 3306,
                    user     : 'root',
                    password : 'root',
                    database : 'matcha',
                    connectionLimit: 10
                })
                await connection.connect((err) => {
                    if (!this.errors(err)) return
                    let r = interest.split(',')
                    let g = r.join("%]'||'[%")
                    // let latitude = -30.559483
                    let latitude = parseFloat(latitud)
                    // let longitude = 22.937506
                    let longitude = parseFloat(longitud)
                    // let r_earth = Math.pow(6371, 3)
                    // console.log(gender)
                    // console.log(age)
                    
                    let r_earth = 6371
                    connection.query(`SELECT * FROM users WHERE  ${gender} && age BETWEEN ${minage} AND ${maxage} && interest LIKE \'[%${g.substring(1, g.length - 1)}%]\' && latidute BETWEEN latidute AND ${latitude + (distance / r_earth) * (180 / 3.145)} && longitude BETWEEN longitude AND ${longitude + (distance / r_earth) * (180 / 3.145) / Math.cos(latitude * 3.145/180)} ORDER BY tlike DESC`, (err, result) => {
                        if (!err){
                            let check = JSON.stringify(result)
                             console.log(result);
                            if(check.localeCompare('[]') !== 0){
                                //  console.log(result);
                                resolve({result: 1, 
                                    info: result.map(data => {
                                        return {
                                            user_id: data.id,
                                            firstname: data.firstname,
                                            lastname: data.lastname,
                                            age: data.age,
                                            bio: data.bio,
                                            interest: data.interest,
                                            gender: data.gender,
                                            like: data.tlike
                                        }
                                    })
                                })
                            }else{
                                resolve({result: 0 ,username: "username does not exist"})
                            }
                        }else{
                            console.log(err);
                            reject({result: 0 ,username: "username does not exist"})
                        }
                    })
                    // connection.end()
                })
            })

            users.then(async data =>{
                // console.log(data)
                let connection =  mysql.createConnection({
                    host     : 'mysql',
                    port     : 3306,
                    user     : 'root',
                    password : 'root',
                    database : 'matcha',
                    connectionLimit: 10
                })
                if (data.result){
                    await connection.connect((err) => {
                        if (!this.errors(err)) return
                        connection.query(`SELECT friend_id FROM likes WHERE user_id = \'${user_id}\'`, (err, result) => {
                            if (!err){
                                let check = JSON.stringify(result)
                                // console.log(result)
                                if(check.localeCompare('[]') !== 0){
                                    //  console.log(result);
                                    //  console.log(result.user_id)
                                    //  const finalArr = data.info.filter(({user_id}) =>
                                    //     !result.some(exclude => exclude.friend_id === user_id)
                                    // );
                                    const finalArr = data.info.filter(data =>{
                                        let i = 0
                                        for(let j = 0; j < result.length; j++){
                                            // console.log(data.user_id === parseInt(result.friend_id))
                                            // console.log(data.user_id)
                                            // console.log(result[j].friend_id)
                                            if (data.user_id === parseInt(result[j].friend_id)){
                                                i = 1
                                            }
                                        }
                                        if (!i)
                                            return data
                                    })
                                    // console.log(finalArr)

                                    res.json({result: 1, info: finalArr})
                                    //  res.json(data)
                                }else{
                                    res.json(data)

                                    // res.json({result: 0 ,username: "username does not exist"})
                                }
                            }else{
                                console.log(err);
                                throw err
                                // json({result: 0 ,username: "username does not exist"})
                            }
                        })
                        // connection.end()
                    })
                }else{
                    res.json({result: 0 })
                }
            })
        } catch (error) {
            
        }
    }

}

module.exports = dbConnection;