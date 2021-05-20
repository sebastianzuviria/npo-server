require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

s3.listBuckets({}, (error, data) => {
    if(error) throw error;
    console.log(data)
})

const params = {
    Bucket: 'ong-team-27'
}

s3.listObjectsV2(params, (error, data) => {
    if (error) throw error
    console.log(data)
})