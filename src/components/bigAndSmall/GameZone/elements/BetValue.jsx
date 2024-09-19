import { Input, Typography } from 'antd'
import { useState } from 'react'
import { Icon } from 'src/components/common/icons'

export const BetValue = () => {
  const [selected, setSelected] = useState(null)
  const betValue = [1, 5, 25, 50, 100]
  const onChangeBetValue = (target) => {
    setSelected(target)
  }
  const selectedClass = 'border-solid border-[1px] bg-[#8e9094]'
  return (
    <div className="flex w-full justify-center gap-4">
      {betValue.map((value) => (
        <span
          key={value}
          className={`flex items-center gap-1 pb-2 pt-2 pl-4 pr-4 shadow-[inset_0_1px_4px_0px_#FFFFFF40] rounded-lg select-none cursor-pointer ${
            selected === value ? selectedClass : ''
          }`}
          onClick={() => onChangeBetValue(value)}
        >
          <Typography.Text className="text-white text-base font-medium">
            {value}
          </Typography.Text>
          <Icon name="dollar" />
        </span>
      ))}
      <span className="flex items-center gap-1 pb-2 pt-2 pl-4 pr-4 shadow-[inset_0_1px_4px_0px_#FFFFFF40] rounded-lg">
        <Input
          className="w-[60px] text-white bg-transparent border-none"
          placeholder="Value"
          onChange={(event) => onChangeBetValue(event.target.value)}
          value={selected}
        />
        <Icon name="dollar" />
      </span>
    </div>
  )
}
