import dbConnect from '../../db/dbConnect'
dbConnect()
import Item from '../../db/Item'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({
    req,
  })
  const { method } = req
  const reqbody = req.body

  switch (method) {
    case 'GET':
      res.status(400).json({
        success: false,
        message: 'No data for GET request',
      })
      break
    case 'POST':
      if (reqbody.data) {
        try {
          const itemId = reqbody.id
          var resp = await Item.findByIdAndUpdate(itemId, reqbody.data, {
            new: true,
          })

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
      } else if (reqbody.deleteItem) {
        try {
          const itemId = reqbody.id
          var resp = await Item.findByIdAndDelete(itemId)

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
      } else if (reqbody.checkItemsData) {
        try {
          const itemId = reqbody.id
          var resp = await Item.findById(itemId)

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
      } else {
        res.status(400).json({
          success: false,
          message: 'No valid request',
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
