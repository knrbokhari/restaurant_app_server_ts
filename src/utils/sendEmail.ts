import nodemailer from 'nodemailer';

const sendEmail = async (options: { email: any; subject: any; message: any; }): Promise<any | void> => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST,
        secure: false,
        auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
        },
        tls: {
        rejectUnauthorized: false,
        },
    });
    
    // send mail with defined transport object
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    
    const info = await transporter.sendMail(message);
    
    console.log('Message sent: %s', info.messageId);
};

export default sendEmail;

