require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports= {
    send: msg => {

        sgMail.send(msg)
        
        .then(response => {
            
            if(response[0].statusCode === 202) console.log('Email sent successfully');
            
        })
        .catch(error => console.log(error.response.body.errors[0].message))
    }
}