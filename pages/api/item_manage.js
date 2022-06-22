import dbConnect from '../../db/dbConnect'
dbConnect()
import Item from '../../db/Item'

export default async function handler(req, res) {
  const { method } = req
  const reqbody = req.body

  try {
    if (reqbody.data) {
      const itemId = reqbody.validation.id
      var resp = await Item.findByIdAndUpdate(itemId, reqbody.data, {
        new: true,
      }).then((data, err) => {
        if (err) {
          return {
            status: 'error',
            err,
          }
        } else {
          return {
            status: 'success',
            data,
          }
        }
      })

      res.status(201).json({
        success: true,
        resp,
      })
    } else if (reqbody.deleteItem) {
      const itemId = reqbody.id
      var resp = await Item.findByIdAndDelete(itemId).then((data, err) => {
        if (err) {
          return {
            status: 'error',
            err,
          }
        } else {
          return {
            status: 'success',
            data,
          }
        }
      })

      res.status(201).json({
        success: true,
        resp,
      })
    } else if (reqbody.checkUser) {
      const itemId = reqbody.id
      var resp = await Item.findById(itemId).then((data, err) => {
        if (err) {
          return {
            status: 'error',
            err,
          }
        } else {
          return {
            status: 'success',
            data,
          }
        }
      })

      res.status(201).json({
        success: true,
        resp,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'No valid request',
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    })
    console.log(error)
  }
}
