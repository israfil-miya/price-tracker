const fetchWithTimeout = async (resource, options = {}) => {
  const { timeout = 6000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })
  clearTimeout(id)

  return response
}

const getPriceConverted = async (price, baseCode, code, timeoutAmount) => {
  const response = await fetchWithTimeout(
    'https://v6.exchangerate-api.com/v6/522bf58887ecce0f6af15527/latest/' +
      baseCode,
    {
      timeout: timeoutAmount || 6000,
    },
  )
  const data = await response.json()

  const exchangeRate = data.conversion_rates[code]
  return {
    price_converted: parseFloat((price * exchangeRate).toFixed(2)),
    converted_to_country_code: code,
  }
}

export default getPriceConverted
