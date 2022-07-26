import getprice from 'eshop-scraper'
import * as dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'
import db from './db.js'
import htmlTamplate from './email_html_tamplate.js'
//
async function sendMail(
  email,
  name,
  item_name,
  itemsCurrentInfo,
  price_wanted,
  website,
  item_uri,
  currency,
  prev_price,
) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  })
  //
  let info = await transporter.sendMail({
    from: '"Price Tracker" ' + '<' + process.env.EMAIL + '>',
    to: email,
    subject: 'Price Tracker – ' + item_name,
    html: htmlTamplate(
      name,
      item_name,
      itemsCurrentInfo.price,
      price_wanted,
      website,
      item_uri,
      currency,
      prev_price,
    ),
  })
}
//
var counter = 0
async function updates_checker() {
  const data = await db.Item.find()
  await Promise.all(
    data.map(async (item, i) => {
      //
      const UserData = await db.User.findById(item.User_ID)
      //
      if (!UserData) return
      //
      var item_name = item.item_name
      var curr_price = item.curr_price
      let prev_price = item.curr_price
      let price_wanted = item.price_wanted
      var item_uri = item.item_uri
      let currency = UserData.currency || 'USD'
      var website = item.website
      let email = UserData.monitor_email || UserData.email
      let name = UserData.name
      //
      const itemsCurrentInfo = await getprice(item_uri, currency)
      //
      if (itemsCurrentInfo.price && !itemsCurrentInfo.IsError) {
        //
        if (itemsCurrentInfo.price != curr_price) {
          //
          let newData = await db.Item.findByIdAndUpdate(
            item._id,
            {
              curr_price: itemsCurrentInfo.price,
              item_name: itemsCurrentInfo.name,
              website: itemsCurrentInfo.site,
            },
            {
              new: true,
            },
          )
          //
          const changeObj = {
            serial_no: i,
            change: "Item's new price",
          }
          let finalData = []
          finalData.push(newData)
          finalData.push(changeObj)
          console.log(finalData)
          //
          curr_price = newData.curr_price
          item_name = newData.item_name
          website = newData.website
          //
          if (itemsCurrentInfo.price <= price_wanted) {
            // sends email informing the user that price is lower than his wanted price

            await sendMail(
              email,
              name,
              item_name,
              itemsCurrentInfo,
              price_wanted,
              website,
              item_uri,
              currency,
              prev_price,
            )
            console.log({
              email_sent: 'An email has been sent to ' + email,
            })
          }
          //
          return
        }
        //
      } else if (
        itemsCurrentInfo.IsError &&
        item_uri != 'https://price-tracker-ivory.vercel.app/404'
      ) {
        //
        let newData = await db.Item.findByIdAndUpdate(
          item._id,
          {
            item_uri: 'https://price-tracker-ivory.vercel.app/404',
          },
          {
            new: true,
          },
        )
        //
        const changeObj = {
          serial_no: i,
          change: 'Unknown website error',
        }
        let finalData = []
        finalData.push(newData)
        finalData.push(changeObj)
        console.log(finalData)
        //
        item_uri = newData.item_uri
        //
      }
      //
    }),
  )
  //
}
;(async function main_func() {
  if (counter == 0) console.log('ENGINE STARTED !!!\n')
  //
  if (counter != 0) console.log('\n')
  await updates_checker()
  //
  counter++
  console.log('\nLOOP DONE !!!')
  console.log('LOOP COUNTER: ' + counter)
  // Loop this (main_func) function repeatedly after set number of time
  setTimeout(main_func, process.env.INTERVAL_TIME_IN_SEC * 1000)
})()
//
//
