import { useEffect, useState } from 'react'
import { PrizeNumber } from './elements/Prize'
import { apiGetHistory } from 'src/store/sagas/game'
import { formatPrizeData } from 'src/store/slice/game/type'

export const Prize = () => {
  const [prizes, setPrizes] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await apiGetHistory({ code: 'LT6452', page: 1, limit: 1 })
    setPrizes(formatPrizeData(res?.data))
  }

  return (
    <div className="prize flex justify-between gap-28">
      {prizes?.map((prize, index) => (
        <PrizeNumber
          icon={prize.icon}
          prize={prize.prize}
          name={prize.name}
          key={`home-prize-${index}`}
        />
      ))}
    </div>
  )
}
