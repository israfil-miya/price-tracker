import EshopScraper from 'eshop-scraper';
import currencyConvert from "./currency.js"
import sendMail from "./email.js"

const scraper = new EshopScraper({timeout: 10000})

const checkAndUpdateItem = async (db, itemId) => {
  try {
    const item = await db.Item.findById(itemId);

    if (!item) {
      console.error(`Item not found: ${itemId}`);
      return;
    }

    const UserData = await db.User.findById(item.User_ID);

    if (!UserData) {
      console.error(`User not found for item ${item._id}`);
      return;
    }

    const { item_name, curr_price, item_uri, website, price_wanted } = item;

    const prev_price = curr_price;
    const currency = UserData.currency
    const email = UserData.monitor_email || UserData.email;
    const name = UserData.name;

    let itemsCurrentInfo = await scraper.getData(item_uri);

    if (!itemsCurrentInfo || itemsCurrentInfo.IsError) {
      console.error(`Website fetch error for item ${item._id}: ${itemsCurrentInfo.ErrorMsg}`);
      /*
      if (item_name !== "Error fetching the website") {
        await db.Item.updateOne(
          { _id: item._id },
          {
            $set: {
              item_name: "Error fetching the website",
            },
          }
        );
        
      }
      */
      return;
    }

    
    if(currency!=itemsCurrentInfo.currency) {
      let conversion = await currencyConvert(
        itemsCurrentInfo.price,
        itemsCurrentInfo.currency,
        currency,
        scraper._timeoutAmount
      )
      
      itemsCurrentInfo.price = conversion.price_converted
      itemsCurrentInfo.currency = conversion.converted_to_country_code
    }

    const { price } = itemsCurrentInfo;

    if (price !== curr_price) {
      await db.Item.updateOne(
        { _id: item._id },
        {
          $set: {
            curr_price: price,
            item_name: itemsCurrentInfo.name,
            website: itemsCurrentInfo.site,
          },
        }
      );

      const updatedItem = await db.Item.findById(item._id);

      console.log(`Item ${item._id} updated with new price`);

      const priceDropped = price <= price_wanted && prev_price > price;

      if (priceDropped) {
        await sendMail(
          email,
          name,
          updatedItem.item_name,
          itemsCurrentInfo,
          price_wanted,
          website,
          item_uri,
          currency,
          prev_price
        );
      }
    }
  } catch (error) {
    console.error(`Error processing item ${itemId}: ${error.message}`);
    // Add error handling and recovery mechanism here if desired
  }
};

export default checkAndUpdateItem;
