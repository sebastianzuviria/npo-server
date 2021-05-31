require('dotenv').config();

const { send } = require('./email.config');

module.exports = {

    sendMail: async paramsMail => {

        const {to, dynamic_template_data} = paramsMail;

        const msg = {
            to,
            from: process.env.SENDGRID_VERIFIED_EMAIL,
            templateId: process.env.SENDGRID_TEMPLATE_ID,
            dynamic_template_data
        }
        
        return await send(msg)
        
    }

}