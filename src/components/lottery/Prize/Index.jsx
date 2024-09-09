import { useState } from 'react'
import { PrizeNumber } from './elements/Prize'
import useGame from 'src/store/hooks/game'

export const Prize = (props) => {
  const [selectedPrize, setSelectedPrize] = useState(null)
  const { data } = useGame()
  const { prizes } = data

  const handleClickPrize = (prize) => {
    setSelectedPrize(prize.prize)
    props.setSelectedPrize(prize.prize)
  }

  return (
    <div className="prize flex justify-center mt-32 gap-20">
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
