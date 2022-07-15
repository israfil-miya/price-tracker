import dbConnect from '../../db/dbConnect'
dbConnect()
import User from '../../db/User'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({
    req,
  })
  const data = req.body
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const configs = await User.findById(session.user.uid)
        res.status(200).json(configs)
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Ow snap! Something gone wrong.',
          error,
        })
      }
      break
    case 'POST':
      if (data.getData) {
        try {
          const configs = await User.findById(data.uid)
          res.status(200).json(configs)
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Ow snap! Something gone wrong.',
            error,
          })
        }
      } else {
        try {
          var oldData = await User.findById(data.User_ID)
          oldData.monitor_email =
            data.monitor_email && data.monitor_email != ''
              ? data.monitor_email
              : oldData.monitor_email || session.user.email
          oldData.currency =
            data.currency && data.currency != ''
              ? data.currency
              : oldData.currency || 'USD'
          var resp = await oldData.save()
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
