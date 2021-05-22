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

const upload = multer({ storage }).single('image')

//-------------------------------------------------//

const uploadImage = async (file) => {
    const myFile = file.originalname.split('.')
    const fileType = myFile[myFile.length -1]

    const params = {
        Bucket: process.env.BUCKET_NAME,
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
        Bucket: process.env.BUCKET_NAME,
        Key: imageName
    }

    return new Promise((resolve, reject) => s3.deleteObject(params, (error, data) => {
        if (error) reject(error)
        else resolve(data)
    }))
}

const uploadImgServices = {
    uploadImage,
    deleteImage,
    upload
}

module.exports = uploadImgServices