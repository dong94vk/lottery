import { Typography } from 'antd'
import { useState } from 'react'

export const LotteryNumber = (props) => {
  const { number, handleClickNumber, className } = props
  const [selected, setSelected] = useState(false)
  const handleClick = () => {
    setSelected(!selected)
    handleClickNumber(number, !selected)
  }
  return (
    <Typography.Text
      className={`w-14 h-14 rounded-[50%] shadow-[inset_0_1px_4px_0_#FFFFFF40] bg-[#35383e] text-xl font-medium text-white p-3 flex items-center justify-center cursor-pointer select-none ${
        selected ? 'bg-custom-gradient' : ''
      } ${className}`}
      onClick={handleClickNumber && handleClick}
    >
      {number?.toString().padStart(2, '0')}
    </Typography.Text>
  )
}
