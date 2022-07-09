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
    case 'POST':
      if (!data.getdata) {
        try {
          var resp = await User.findById(data.User_ID)
          resp.monitor_email = data.monitor_email || session.user.email
          resp.currency =
            data.currency && data.currency != '' ? data.currency : 'USD'
          var newData = await resp.save()
          res.status(201).json({
            resp: {
              status: 'success',
              message: 'configAdded',
              success: true,
              newData,
            },
          })
        } catch (error) {
          res.status(400).json({
            resp: {
              success: false,
              status: 'error',
              message: 'configFailed',
            },
          })
          console.log(error)
        }
      } else {
        try {
          const configs = await User.findById(data.uid)
          res.status(200).json({
            configs,
          })
        } catch (error) {
          res.status(400).json({
            success: false,
            error: 'Unable to fetch data',
          })
        }
      }
      break
    case 'GET':
      try {
        const configs = await User.findById(session.user.uid)
        res.status(200).json(configs)
      } catch (error) {
        res.status(400).json({
          success: false,
          error: 'Unable to fetch data',
        })
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
