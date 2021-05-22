const AWS = require('aws-sdk')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

//MIDDLEWARE TO SAVE IMAGE 
const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '')
    }
})

exports.upload = multer({ storage }).single('image')

//-------------------------------------------------//

