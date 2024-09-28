import { useEffect, useState } from 'react'
import { PrizeNumber } from './elements/Prize'
import { apiGetHistory } from 'src/store/sagas/bigAndSmall'
import { formatPrizeData } from 'src/store/slice/bigAndSmall/type'
import { isEmpty } from 'lodash'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const Prize = () => {
  const [loading, setLoading] = useState(false)
  const [prizes, setPrizes] = useState([])
  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  useEffect(() => {
    if (!isEmpty(prizes)) setLoading(false)
  }, [prizes])

  const fetchData = async () => {
    const res = await apiGetHistory({ code: 'LT6452', page: 1, limit: 1 })
    setPrizes(formatPrizeData(res?.data))
  }

  return (
    <div className="prize flex justify-between gap-28">
      {loading && (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      )}
      {!loading &&
        prizes?.map((prize, index) => (
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
