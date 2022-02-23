import dbConnect from '../../db/dbConnect'
dbConnect()
import Faq from '../../db/Faqs'

export default async (req, res) => {
  const data = req.body
  const {
    method
  } = req

  switch (method) {
    case "POST":
      try {


        var resp = await Faq.updateOne({
          "User_ID": data.User_ID
        }, data).then(function(err, res) {
          if (err) {
            var errMessage = err.matchedCount == 0 ? "Faq Record does not exist, will create new...": "Record not updated";
            // If no match, create new
            if (err.matchedCount == 0) {
              const create_faq = new Faq(data);
              resp = create_faq.save().then(function() {
                return ({
                  status: "success",
                  message: "createdNew"
                })
              });
              return resp;
            }

            // Exists, return success update message
            if (err.matchedCount == 1) {
              return ({
                status: "success",
                message: "updated"

              })
            } else {
              return ({
                status: "error",
                code: err.modifiedCount,
                message: errMessage
              })
            }
          }
        })
        .catch((error) => {
          return ({
            status: "error",
            code: 400,
            message: "serverError"

          })
        });


        res.status(201).json({
          success: true,
          resp
        })

      } catch (error) {
        res.status(400).json({
          success: false
        })
        console.log(error)
      }
    break
    case "GET":
      try {
        const faqs = await Faq.find({})
        res.status(200).json({
          faqs
        })
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error
        })
      }
    break
    default:
      res.status(400).json({
        success: false,
        error: true
      })
    break
  }

};
