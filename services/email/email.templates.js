
module.exports = {
    templatethanksContact: (name, email) => `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thanks - Contacts</title>
            <style>
                
                .content{
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(1fr, 720px));
                    row-gap: 2rem;
                    justify-items: center;
                    text-align: center;
                    box-shadow: 0 0 5px 1px rgba(126, 126, 124, 0.5);
                    background-color:rgba(223, 223, 222, 0.5);
                    
                }
                .text{
                    padding: 0 0 2rem;
                    text-align: center;
                }
                @media screen and (min-width: 720px){
                    body{
                        
                        display:grid;
                        justify-items: center;
                    }
                    .content{
                        grid-template-columns: repeat(auto-fit, minmax(720px, 1fr));
                    }
                }
            </style>
        </head>
        <body>
            <div class="content">

            <h3 class="title">¡ Muchas gracias por completar el formulario ${name}!</h3>

            <p class="text">
                En breves estaremos resolviendo su inquietud al mail ${email}
                
            </p>
            </div>
        </body>
        </html>
    `
}