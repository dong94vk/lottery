import { Typography } from 'antd'

export const TicketNumber = (props) => {
  const { number, className } = props

  return (
    <div className="flex flex-col items-center justify-center border-solid	border-2 rounded-[50%] border-[#2e2e37] p-3 bg-[#292a36] w-[50px] h-[50px]">
      <Typography.Text className={`${className} text-[16px] font-semibold`}>
        {number}
      </Typography.Text>
    </div>
  )
}
