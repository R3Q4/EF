import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

async function testEmail() {

  try {
    const { data, error } = await resend.emails.send({
      from: `onresend@gmail.com`,
      to: 'cpulucks@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email from Resend'
    })
    if (error) {
      console.error("Resend error:", error)
    } else {
      console.log("Email sent successfully:", data)
    }
  } catch (e) {
    console.error("Unexpected error:", e)
  }
}

testEmail()
