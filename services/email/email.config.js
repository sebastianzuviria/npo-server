require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports= {

    send: async msg => {

        try{

            const response = await sgMail.send(msg);

            if(response[0].statusCode === 202) return {status: response[0].statusCode , message: 'Email sent successfully'};
            
        }catch(error){
            
            return {status: 400, error: error.message}

        }

    }

}