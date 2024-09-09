import { Typography } from 'antd'
import { Icon } from 'src/components/common/icons'
import { useState } from 'react'
import useGame from 'src/store/hooks/game'

export const ChooseNumberElement = (props) => {
  const { onChangeNumber, index, numberSelected } = props
  const { data } = useGame()
  const { setting } = data
  const [displayNumber, setDisplayNumber] = useState()

  const handleClickChevron = (chevron) => {
    let nextNumber = displayNumber ?? +setting.range.min
    if (chevron === 'up' && displayNumber < setting.range.max) {
      nextNumber = displayNumber + 1
    }
    if (chevron === 'down' && displayNumber > setting.range.min) {
      nextNumber = displayNumber - 1
    }
    if (!setting.isDuplicate) {
      nextNumber = getNextNumberNotDuplicate(nextNumber, chevron, displayNumber)
    }
    setDisplayNumber(nextNumber)
    onChangeNumber(index, nextNumber)
  }

  const getNextNumberNotDuplicate = (number, chevron) => {
    if (
      chevron === 'up' &&
      numberSelected.includes(number) &&
      number < setting.range.max
    ) {
      return getNextNumberNotDuplicate(number + 1, chevron)
    }
    if (
      chevron === 'down' &&
      numberSelected.includes(number) &&
      number > setting.range.min
    ) {
      return getNextNumberNotDuplicate(number - 1, chevron)
    }
    return number
  }

  return (
    <div className="flex flex-col items-center justify-center border-solid	border-2 rounded-3xl border-[#2e2e37] p-3 bg-[#292a36]">
      <Icon name="chevronUp" onClick={() => handleClickChevron('up')} />
      <Typography.Text className="!text-white text-[32px] font-normal">
        {displayNumber?.toString().padStart(2, '0') || '??'}
      </Typography.Text>
      <Icon name="chevronDown" onClick={() => handleClickChevron('down')} />
    </div>
  )
}
