const { sendMail } = require('./email.methods');
const { templatethanksContact } = require('./email.templates');

module.exports = {
    
    sendEmailContactThanks: async contact => {
        const { name, email, phone, message } = contact;
        
        emailPreparation = {
            to: email,
            subject: 'Contacto recibido!',
            text: `Muchas gracias ${name} por completar el formulario de contactos en breves contestaremos su inquietud al email ${email}.`,
            html: templatethanksContact(name, email)
        }

        return await sendMail(emailPreparation);
        
    }

}