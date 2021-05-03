require('dotenv').config();

const { send } = require('./email.config');

module.exports = {

    sendMail: ({to='' , subject='', text='', html=''}) => {

        const msg = {
            to,
            from: process.env.SENDGRID_VERIFIED_EMAIL,
            subject,
            text,
            html
        }
        
        send(msg)
        
    }

}