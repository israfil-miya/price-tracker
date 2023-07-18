import nodemailer from 'nodemailer'
import htmlTemplate from './tamplate.js'

const sendMail = async (
  email,
  name,
  itemName,
  itemsCurrentInfo,
  priceWanted,
  website,
  itemUri,
  currency,
  prevPrice,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: `"Price Tracker" <${process.env.EMAIL}>`,
      to: email,
      subject: `Price Tracker - ${itemName}`,
      html: htmlTemplate(
        name,
        itemName,
        itemsCurrentInfo.price,
        priceWanted,
        website,
        itemUri,
        currency,
        prevPrice,
      ),
    })

    console.log(`Email sent to ${email}`)
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error)
    // Add error handling and recovery mechanism here if desired
  }
}

export default sendMail
