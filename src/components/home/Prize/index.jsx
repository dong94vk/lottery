import { useEffect, useState } from 'react'
import { PrizeNumber } from './elements/Prize'
import useGame from 'src/store/hooks/game'

export const Prize = (props) => {
  const [selectedPrize, setSelectedPrize] = useState(null)
  const { data, actions } = useGame()
  const { prizes } = data

  useEffect(() => {
    actions.getHistory({ code: 'LT6452', page: 1, limit: 6 })
  }, [prizes])

  const handleClickPrize = (prize) => {
    setSelectedPrize(prize.prize)
    props?.setSelectedPrize(prize.prize)
  }

  return (
    <div className="prize flex justify-between gap-28">
      {prizes.map((prize) => (
        <PrizeNumber
          icon={prize.icon}
          prize={prize.prize}
          name={prize.name}
          key={prize}
          onClick={handleClickPrize}
          className={selectedPrize === prize.prize ? 'text-cyan-500' : ''}
        />
      ))}
    </div>
  )
}
