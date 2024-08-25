import { Typography } from 'antd'

export const CountDownNumber = (props) => {
  const { number, text } = props
 
  return (
    <div className="shadow-[inset_0_0_20px_0_#6098FF] rounded-[16px] w-[156px] h-[156px] flex flex-col justify-between items-center p-[10px] gap-col-2">
      <Typography.Title level={1} className="!text-white !text-8xl !m-0 ">
        {number?.toString().padStart(2, '0')}
      </Typography.Title>
      <Typography.Title level={2} className="!text-white !text-4xl !m-0">
        {text}
      </Typography.Title>
    </div>
  )
}
