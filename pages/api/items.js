import dbConnect from '../../db/dbConnect'
dbConnect()
import Item from '../../db/Item'
import { getSession } from 'next-auth/react'
export async function getServerSideProps(context) {
  const session = await getSession(context)
    // code for redirect if not logged in
  if (!session) {
    return {
      redirect: {
        destination: '/?error=forbidden',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}
export default async function handler ( req, res) {
  const session = await getSession({req});
  const { method } = req
  const data = req.body

  switch (method) {
    case 'GET':
      try {
        const items = await Item.find({})
        res.status(200).json({items})
      } catch (error) {
        res.status(400).json({ success: false, error: error})
        
      }
      break
    case 'POST':
      if (!data.getdata) {
      try {
        var resp = await Item.updateOne({
          "item_uri": data.item_uri, "User_ID": data.User_ID
        }, data).then(function(err, res) {
          if (err) {
            var errMessage = err.matchedCount == 0 ? "Item Record does not exist, will create new...": "Record not updated";
            // If no match, create new
            if (err.matchedCount == 0) {
              const create_item = new Item(data);
              resp = create_item.save().then(function() {
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
        res.status(400).json({ success: false })
        console.log(error)
      }
      } else {
        try {
          const filter = {
            User_ID: data.uid
          };
          console.log(data.uid)
        await Item.find(filter).then((data, err)=>{
          if(err){
            res.status(200).json(err)
          }
          res.status(200).json(data)
        })
        
      } catch (error) {
        res.status(400).json({ success: false, error: error})
        
      }
      }
      break
    default:
      res.status(400).json({ success: false, error: true})
      break
  }
 
}