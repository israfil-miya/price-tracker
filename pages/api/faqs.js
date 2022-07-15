import dbConnect from '../../db/dbConnect'
dbConnect()
import Faq from '../../db/Faqs'

export default async function handler(req, res) {
  const data = req.body
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const faqs = await Faq.find({})
        res.status(200).json(faqs)
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Ow snap! Something gone wrong.',
          error,
        })
      }
      break
    case 'POST':
      try {
        var resp = await Faq.findOneAndUpdate(
          {
            User_ID: data.User_ID,
          },
          data,
          {
            new: true,
            upsert: true,
          },
        )

        res.status(200).json({
          success: true,
          resp,
        })
      } catch (error) {
        res.status(400).json({
          success: false,
        })
        console.log(error)
      }
      break
    default:
      res.status(400).json({
        success: false,
        error: true,
      })
      break
  }
}
