import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getLuaPrice} from '../sushi/utils'
import useSushi from './useSushi'
import axios from 'axios'
import config from '../config'
const useLuaPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  const sushi = useSushi()

  const fetchBalance = useCallback(async () => {
    var { data } = await axios.get(`${config.api}/api/tokens/price/LUA`)
    const value = data.usdPrice
    setPrice(new BigNumber(value * 10 ** 8))
  }, [sushi])

  useEffect(() => {
    if (sushi) {
      fetchBalance()
    }
  }, [setPrice, sushi])

  return price
}

export default useLuaPrice
