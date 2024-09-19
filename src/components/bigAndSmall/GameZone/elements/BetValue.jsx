import { Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Icon } from 'src/components/common/icons'
import styled from 'styled-components'

export const BetValueStyled = styled.div`
  .ant-input {
    padding: unset !important;
  }
`

export const BetValue = (props) => {
  const { onChange, flag, setFlag } = props
  const [selected, setSelected] = useState(null)
  const [flagSelected, setFlagSelected] = useState(flag)
  const betValue = [1, 5, 25, 50, 100]

  const onChangeBetValue = (target) => {
    onChange(target)
    setSelected(target)
  }

  useEffect(() => {
    if (flag) {
      setFlagSelected(flag)
      const timeOutFlag = setTimeout(() => {
        setFlagSelected(false)
        setFlag(false)
      }, 1000)
      return () => clearTimeout(timeOutFlag)
    }
  }, [flag])

  const flagClass = 'border-[1px] border-white shadow-[0_1px_4px_0_#FFFFFF40]'

  const selectedClass = 'border-solid border-[1px] bg-[#8e9094]'

  return (
    <BetValueStyled className="flex w-full justify-center gap-4">
      {betValue.map((value) => (
        <span
          key={value}
          className={`flex items-center gap-1 pb-2 pt-2 pl-2 pr-2 shadow-[inset_0_1px_4px_0px_#FFFFFF40] rounded-lg select-none cursor-pointer ${
            selected === value ? selectedClass : ''
          } ${flagSelected ? flagClass : ''}`}
          onClick={() => onChangeBetValue(value)}
        >
          <Typography.Text className="text-white text-base font-medium">
            {value}
          </Typography.Text>
          <Icon name="dollar" />
        </span>
      ))}
      <span
        className={`flex items-center gap-1 pb-2 pt-2 pl-4 pr-4 shadow-[inset_0_1px_4px_0px_#FFFFFF40] rounded-lg ${
          flagSelected ? flagClass : ''
        }`}
      >
        <Input
          className="w-[60px] text-white bg-transparent border-none"
          placeholder="Value"
          onChange={(event) => onChangeBetValue(event.target.value)}
          value={selected}
        />
        <Icon name="dollar" />
      </span>
    </BetValueStyled>
  )
}
