import dbConnect from '../../db/dbConnect'
dbConnect()
import User from '../../db/User'
import {
  getSession
} from 'next-auth/react'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}

export default async function handler(req, res, {
  session
}) {
  //const session = await getSession({ req })
  console.log(session)
  /*
  const data = req.body
  const {
    method
  } = req
  console.log(data)
  if (method == "POST") {
    try {
      var resp = await User.findById(data.User_ID)
      resp.monitor_email = data.monitor_email
      resp.currency = data.currency
      var newData = await resp.save()
      console.log(newData)
      res.status(201).json({
        success: true,
        status: 'success',
        message: 'updated',
        newData,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        status: 'error',
        message: 'serverError',
      })
      console.log(error)
    }
  }
  if (method == "GET") {
    res.status(201).json({
      message: 'Hi from the owner'
    })
  }
  */
}


  export default async (req, res) => {
    const data = req.body
    const {
      method
    } = req

    switch (method) {
    case 'POST':
      try {
        var resp = await Faq.updateOne(
          {
            User_ID: data.User_ID,
          },
          data,
        )
        .then(function (err, res) {
          if (err) {
            var errMessage =
            err.matchedCount == 0
            ? 'Faq Record does not exist, will create new...': 'Record not updated'
            // If no match, create new
            if (err.matchedCount == 0) {
              const create_faq = new Faq(data)
              resp = create_faq.save().then(function () {
                return {
                  status: 'success',
                  message: 'createdNew',
                }
              })
              return resp
            }

            // Exists, return success update message
            if (err.matchedCount == 1) {
              return {
                status: 'success',
                message: 'updated',
              }
            } else {
              return {
                status: 'error',
                code: err.modifiedCount,
                message: errMessage,
              }
            }
          }
        })
        .catch((error) => {
          return {
            status: 'error',
            code: 400,
            message: 'serverError',
          }
        })

        res.status(201).json({
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
    case 'GET':
      try {
        const faqs = await User.findById(User_ID)
        res.status(200).json({
          faqs,
        })
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error,
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