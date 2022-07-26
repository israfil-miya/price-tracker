export default function htmlTamplate(
  users_name,
  items_name,
  items_curr_price,
  items_wanted_price,
  website_name,
  items_uri,
  currency,
  items_prev_price,
) {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body class="container" style="font-family: 'Courier New', monospace;">
  <h4 class="heading" style="text-align: center;padding: 2rem;background-color: #070015;border-radius: 5px;color: #ececec;">
    Price Tracker Update
  </h4>
  <div>
    <div class="heading2" style="text-align: center;padding: 2rem;background-color: #070015;border-radius: 5px;color: #ececec;">
      <p class="subHeading">
        Hello ${users_name}! One of your monitored item's price got down.
      </p>
      <small class="tag">You may interest to buy it now!</small>
    </div>
    <br>
    <div class="list" style="padding: 2rem;background-color: #070015;border-radius: 5px;color: #ececec;line-height: 6px;word-wrap: break-word;">
      <h5>
        <span class="field">Item's name: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;">${
          items_name.substring(0, 23) + '…'
        }</span>
      </h5>
      <h5>
        <span class="field">Item's wanted price: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;">${
          items_wanted_price + ' ' + currency
        }</span>
      </h5>
      <h5>
        <span class="field">Item's previous price: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;">${
          items_prev_price + ' ' + currency
        }</span>
      </h5>
      <h5>
        <span class="field">Item's current price: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;">${
          items_curr_price + ' ' + currency
        }</span>
      </h5>
      <h5>
        <span class="field">Dropped: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;">${
          items_prev_price != 0
            ? parseFloat(items_prev_price - items_curr_price).toFixed(2) +
              ' ' +
              currency
            : '0 ' + currency
        }</span>
      </h5>
      <h5>
        <span class="field">Website: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;">${website_name}</span>
      </h5>
      <h5>
        <span class="field">Link: </span>
        <span class="query" style="font-weight: normal;color: #E30B5C;"><a href=${items_uri} style="text-decoration: none;color: rgb(65, 105, 225);">${
    items_uri.substring(0, 25) + '…'
  }</span>
      </h5>
    </div>
  </div>
</body>
</html>
  `
}
