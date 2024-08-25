import { Typography } from 'antd'

export const AddedNumber = (props) => {
  const { number } = props

  return (
    <div className="flex flex-col items-center justify-center border-solid	border-2 rounded-[50%] border-[#2e2e37] p-3 bg-[#292a36] w-[70px] h-[70px]">
      <Typography.Text className="!text-white text-[28px] font-semibold">
        {number.toString().padStart(2, '0')}
      </Typography.Text>
    </div>
  )
}
