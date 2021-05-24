require('dotenv').config()

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database":  process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql",
        "aws_access_key_id": process.env.AWS_ACCESS_KEY_ID,
        "aws_secret_access_key": process.env.AWS_SECRET_ACCESS_KEY,
        "aws_s3_bucket_name": process.env.AWS_S3_BUCKET_NAME
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME_TEST,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "aws_access_key_id": process.env.AWS_ACCESS_KEY_ID,
        "aws_secret_access_key": process.env.AWS_SECRET_ACCESS_KEY,
        "aws_s3_bucket_name": process.env.AWS_S3_BUCKET_NAME
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "aws_access_key_id": process.env.AWS_ACCESS_KEY_ID,
        "aws_secret_access_key": process.env.AWS_SECRET_ACCESS_KEY,
        "aws_s3_bucket_name": process.env.AWS_S3_BUCKET_NAME
    }
}