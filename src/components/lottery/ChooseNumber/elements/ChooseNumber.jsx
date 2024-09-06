import { Typography } from 'antd'
import { Icon } from 'src/components/common/icons'
import { useState } from 'react'
import useLottery from 'src/store/hooks/lottery'

export const ChooseNumberElement = (props) => {
  const { onChangeNumber, index, numberSelected } = props
  const { data } = useLottery()
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

  // const handleChangeNumber = (value) => {
  //   let nextNumber = displayNumber ?? +setting.range.min
  //   if (
  //     displayNumber < setting.range.max ||
  //     displayNumber > setting.range.min
  //   ) {
  //     nextNumber = value
  //   }
  //   if (!setting.isDuplicate) {
  //     nextNumber = getNextNumberNotDuplicate(nextNumber, 'up', displayNumber)
  //   }
  //   setDisplayNumber(nextNumber)
  //   onChangeNumber(index, nextNumber)
  // }

  return (
    <div className="flex flex-col items-center justify-center border-solid	border-2 rounded-3xl border-[#2e2e37] p-3 bg-[#292a36]">
      <Icon name="chevronUp" onClick={() => handleClickChevron('up')} />
      <Typography.Text className="!text-white text-[32px] font-normal">
        {displayNumber?.toString().padStart(2, '0') || '??'}
      </Typography.Text>
      {/* {!isNil(displayNumber) ? (
        <InputNumber
          controls={false}
          pattern="[0-9]*"
          onKeyPress={(event) => {
            if (
              +event.target.value > setting.range.max ||
              +event.target.value < setting.range.min
            ) {
              event.preventDefault()
            }
            if (
              numberSelected.includes(+event.target.value) &&
              !setting.isDuplicate
            ) {
              event.preventDefault()
            }
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
          stringMode={true}
          value={displayNumber}
          min={setting.range.min}
          max={setting.range.max}
          onChange={handleChangeNumber}
        />
      ) : (
        <Typography.Text className="!text-white text-[32px] font-normal">
          {displayNumber?.toString().padStart(2, '0') || '??'}
        </Typography.Text>
      )} */}
      <Icon name="chevronDown" onClick={() => handleClickChevron('down')} />
    </div>
  )
}
