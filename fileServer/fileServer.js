const express = require('express')
const fileServer = express()
const port = process.env.PORT || 5004
const multer = require('multer')
const fs = require('fs')
const uploadfile = require('./model/UploadImage')

//----------------upload--------------------------------------//
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        // console.log(file)
        // req.body.userid = req.authData.user.id
        cb(null, './uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, files, cb)=>{
    if (files.mimetype ==='image/jpeg'||
        files.mimetype ==='image/jpg' ||
        files.mimetype ==='image/png' ||
        files.mimetype ==='image/gif'){
        (cb(null,true))
    }else{
        cb('image format not accepted',false)
        cb(null, false)
    }
}

const upload = multer({ storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

fileServer.post('/uploadImage', upload.single('pic'),async (req, res, next) =>{
    if (req.file.length === 0){
        console.log('invalid image')
        res.json({result: false, message: 'invalid image'})
    }else{
        res.json({result: true, message: `${req.file.filename}  image uploaded successufly`})
        let user_id =  req.headers['userid']
        let resul = new uploadfile(user_id, fs.readFileSync(`uploads/${req.file.filename}`))
        await resul.Uploadimage(res)
    }
});
fileServer.post('/getImage', async (req, res, next) =>{
        let user_id =  req.headers['userid']
        let resul = new uploadfile(user_id,null)
        await resul.getimage(res)
});
fileServer.listen(port, () => {console.log(`fileServer Running on Port ${port}`)})