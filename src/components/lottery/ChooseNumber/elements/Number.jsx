import { Typography } from 'antd'
import { cloneDeep, remove } from 'lodash'
import useGame from 'src/store/hooks/bigAndSmall'

export const LotteryNumber = (props) => {
  const { number, className, numberAdded, setNumberAdded } = props
  const { data } = useGame()
  const { setting } = data

  const handleClick = () => {
    const newArr = cloneDeep(numberAdded)
    if (newArr?.includes(number)) {
      remove(newArr, (item) => +item === +number)
      setNumberAdded(newArr)
      return
    }
    if (newArr?.length >= setting?.numberQuantity) {
      return
    }
    if (numberAdded?.length < setting?.numberQuantity) {
      newArr.push(number)
      setNumberAdded(newArr)
    }
  }

  return (
    <Typography.Text
      className={`w-14 h-14 rounded-[50%] shadow-[inset_0_1px_4px_0_#FFFFFF40] bg-[#35383e] text-xl font-medium text-white p-3 flex items-center justify-center cursor-pointer select-none ${
        numberAdded?.includes(number) ? 'bg-custom-gradient' : ''
      } ${className}`}
      onClick={handleClick}
    >
      {number?.toString().padStart(2, '0')}
    </Typography.Text>
  )
}
