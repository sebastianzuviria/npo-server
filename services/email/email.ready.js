const { sendMail } = require('./email.methods');

module.exports = {
    
    sendEmailContactThanks: async contact => {
        const { name, email, phone, message } = contact;
        
        emailPreparation = {

            to: email,
            dynamic_template_data: { email, name }

        }

        return await sendMail(emailPreparation);
        
    }

}