const AWS = require('aws-sdk')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const allConfigs = require('../../config/config')

const config = {
    'production': allConfigs.production,
    'development': allConfigs.development,
    'test': allConfigs.test
}

const s3 = new AWS.S3({
    accessKeyId: config[process.env.NODE_ENV].aws_access_key_id,
    secretAccessKey: config[process.env.NODE_ENV].aws_secret_access_key
})

//MIDDLEWARE TO SAVE IMAGE 

const uploadMiddleware = multer({ storage: multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '')
    }
}) }).single('image')

//-------------------------------------------------//

const uploadImage = async (file) => {
    const myFile = file.originalname.split('.')
    const fileType = myFile[myFile.length -1]

    const params = {
        Bucket: config[process.env.NODE_ENV].aws_s3_bucket_name,
        ContentType: file.mimetype,
        Key: `${uuidv4()}.${fileType}`,
        Body: file.buffer,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => s3.upload(params, (error, data) => {
        if (error) reject(error)
        else resolve(data.Location)
    }))
}

const deleteImage = (imageUrl) => {
    const urlSplited = imageUrl.split('/')
    const imageName = urlSplited[urlSplited.length - 1]

    const params = {
        Bucket: config[process.env.NODE_ENV].aws_s3_bucket_name,
        Key: imageName
    }

    return new Promise((resolve, reject) => s3.deleteObject(params, (error, data) => {
        if (error) reject(error)
        else resolve(data)
    }))
}

const imageServices = {
    uploadImage,
    deleteImage,
    uploadMiddleware
}

module.exports = imageServices