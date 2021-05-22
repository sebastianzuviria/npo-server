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

const uploadImage = (file) => {
    const myFile = file.originalname.split('.')
    const fileType = myFile[myFile.length -1]

    const params = {
        Bucket: process.env.BUCKET_NAME,
        ContentType: file.mimetype,
        Key: `${uuidv4()}.${fileType}`,
        Body: file.buffer,
        ACL: 'public-read'
    }

    s3.upload(params).promise()
}

const deleteImage = (imageUrl) => {
    const urlSplited = imageUrl.split('/')
    const imageName = urlSplited[urlSplited.length - 1]

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName
    }

    s3.deleteObject(params).promise()
}

const uploadImgServices = {
    uploadImage,
    deleteImage
}

module.exports = uploadImgServices