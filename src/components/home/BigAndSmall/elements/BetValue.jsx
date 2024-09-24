import { Input, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Icon } from 'src/components/common/icons'
import styled from 'styled-components'

export const BetValueStyled = styled.div`
  .ant-input {
    padding: unset !important;
  }
`

export const BetValue = () => {
  const betValue = [1, 5, 25, 50, 100]
  const navigate = useNavigate()

  return (
    <BetValueStyled className="flex w-full justify-center gap-4" onClick={() => navigate('/big-and-small')}>
      {betValue.map((value, index) => (
        <span
          key={`betValue-${index}`}
          className="flex items-center gap-1 pb-2 pt-2 pl-2 pr-2 shadow-[inset_0_1px_4px_0px_#FFFFFF40] rounded-lg select-none cursor-pointer"
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
        />
        <Icon name="dollar" />
      </span>
    </BetValueStyled>
  )
}
