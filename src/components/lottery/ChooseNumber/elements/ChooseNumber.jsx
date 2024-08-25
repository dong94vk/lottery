import { Typography } from 'antd'
import { Icon } from 'src/components/common/icons/Index'
import { useState } from 'react'
import useLottery from 'src/store/hooks/lottery'
import { isNil } from 'lodash'

export const ChooseNumberElement = (props) => {
  const { onChangeNumber, index } = props
  const { data } = useLottery()
  const { setting } = data
  const [displayNumber, setDisplayNumber] = useState()

  const handleClickChevron = (chevron) => {
    let nextNumber = displayNumber
    if (isNil(displayNumber) && setting.isDuplicate) {
      nextNumber = +setting.range.min
    }
    if (
      chevron === 'up' &&
      displayNumber < setting.range.max &&
      setting.isDuplicate
    ) {
      nextNumber = displayNumber + 1
    }

    if (
      chevron === 'down' &&
      displayNumber > setting.range.min &&
      setting.isDuplicate
    ) {
      nextNumber = displayNumber - 1
    }
    setDisplayNumber(nextNumber)
    onChangeNumber(index, nextNumber)
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
