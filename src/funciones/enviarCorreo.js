import nodemailer from 'nodemailer';

export async function enviarCorreoElectronico(usuarioDestino, asunto = null, cuerpo = null, archivoAdjunto = null, nombreArchivoAdjunto = null) {
    
    const correoEmisor = 'chadvice.softlab@gmail.com';
    const passEmisor = 'leei msit fvsh ycng';

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
        user: correoEmisor,
        pass: passEmisor,
        },
    });
    
    // Opciones del mensaje
    const mailOptions = {
        from: correoEmisor,
        to: usuarioDestino,
        subject: asunto,
        text: cuerpo,
        attachments: [
        {
            filename: nombreArchivoAdjunto,
            content: archivoAdjunto,
            encoding: 'base64',
        },
        ],
    };
    
    // Enviar el correo
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        console.error(error);
        } else {
        console.log('Correo enviado: ' + info.response);
        return "Correo enviado a: " + usuarioDestino
        }
  });
}