import { Typography } from 'antd'
import './index.css'

export const Number = ({ number }) => {
  return (
    <div className="bg-[#8f9094] border-solid border-[1px] border-[linear-gradient(165.4deg, #FFFFFF -10.07%, rgba(255, 255, 255, 0) 89.61%)] w-[60px] h-[60px] rounded-[50%] bg-custom-gradient flex justify-center items-center">
      <Typography.Text className={`${number === '?' ? 'counter': ''} text-5xl font-bold !text-white`}>
        {number === '?' ? null : number}
      </Typography.Text>
    </div>
  )
}
