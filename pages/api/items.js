import dbConnect from '../../db/dbConnect'
dbConnect()
import Item from '../../db/Item'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({
    req,
  })
  const { method } = req
  const data = req.body

  switch (method) {
    case 'GET':
      try {
        const items = await Item.find({ User_ID: session.user.uid })
        res.status(200).json(items)
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
          const items = await Item.find({ User_ID: data.uid })
          res.status(200).json(items)
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Ow snap! Something gone wrong.',
            error,
          })
        }
      } else {
        try {
          var resp = await Item.findOneAndUpdate(
            {
              User_ID: data.User_ID,
              item_uri: data.item_uri,
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
