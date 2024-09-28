import { useEffect, useState } from 'react'
import { PrizeNumber } from './elements/Prize'
import { isEmpty } from 'lodash'
import useLottery from 'src/store/hooks/lottery'

export const Prize = (props) => {
  const [selectedPrize, setSelectedPrize] = useState(null)
  const { data, actions } = useLottery()
  const { prizes } = data

  useEffect(() => {
    if (isEmpty(prizes)) {
      actions.getHistory({ code: 'LT6452', page: 1, limit: 1 })
    }
  }, [prizes])

  const handleClickPrize = (prize) => {
    setSelectedPrize(prize.prize)
    props?.setSelectedPrize(prize.prize)
  }

  return (
    <div className="prize flex justify-center mt-28 gap-20">
      {prizes.map((prize, index) => (
        <PrizeNumber
          icon={prize.icon}
          prize={prize.prize}
          name={prize.name}
          key={`lottery-prize-${index}`}
          onClick={handleClickPrize}
          className={selectedPrize === prize.prize ? 'text-cyan-500' : ''}
        />
      ))}
    </div>
  )
}
