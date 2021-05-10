require('dotenv').config();

const { send } = require('./email.config');

module.exports = {

    sendMail: async paramsMail => {

        const {to, subject, text, html} = paramsMail;

        const msg = {
            to,
            from: process.env.SENDGRID_VERIFIED_EMAIL,
            subject,
            text,
            html
        }
        
        return await send(msg)
        
    }

}