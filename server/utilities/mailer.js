import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
})

export async function send(email, url, sub, msg) {

  const mailOptions = {
    from: `"Ecofind" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: sub,
    html: `
      <h2>Welcome to Ecofind!</h2>
      <p>${msg}</p>
      <a href="${url}">${url}</a>
      <br><br>
      <p>If you didn’t create an account, you can ignore this email.</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}


/*(import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export const send = async (recipient, mail_subject, mail_message) => {
    const { data, error} = await resend.emails.send({
        from: `${process.env.PROJECT_NAME} <${process.env.RESEND_EMAIL}>`,
        to: recipient,
        subject: mail_subject,
        text: mail_message,
    })

    if (error) {
        console.log('Mail Error: ', error)
        return console.error({ error })
        
    }
}*/
{/*

import { Resend } from 'resend'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export const send = async (recipient, mail_subject, mail_message) => {
    try {
        const token = jwt.sign(
            { data: 'Token Data' },
            process.env.JWT_SECRET || 'ourSecretKey',
            { expiresIn: '10m' }
        );

        const messageWithToken = `${mail_message}\n\nVerification Token:\n${token}\n\nOr click here:\nhttps://yourapp.com/verify?token=${token}`;

        const { data, error } = await resend.emails.send({
            from: `${process.env.PROJECT_NAME} <${process.env.RESEND_EMAIL}>`,
            to: recipient,
            subject: mail_subject,
            text: messageWithToken,
        });

        if (error) {
            console.error('Error sending email:', error);
            return;
        }    
        console.log('Email sent successfully:', data);
    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

    */}
