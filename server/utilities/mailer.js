import { Resend } from 'resend'
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
}
