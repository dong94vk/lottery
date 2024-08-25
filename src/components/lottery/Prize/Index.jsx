import { useState } from 'react'
import { PrizeNumber } from './elements/Prize'

export const Prize = (props) => {
  const [selectedPrize, setSelectedPrize] = useState(null)
  const prizes = [
    {
      prize: 1200000,
      name: 'First prize',
      icon: 'firstPrize',
    },
    {
      prize: 5000,
      name: '2nd prize',
      icon: 'secondPrize',
    },
    {
      prize: 50,
      name: '3rd prize',
      icon: 'thirdPrize',
    },
    {
      prize: 5,
      name: '4th prize',
      icon: 'thirdPrize',
    },
  ]
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
