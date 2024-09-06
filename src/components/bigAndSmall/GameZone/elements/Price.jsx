import { Icon } from 'src/components/common/icons'
import { Typography } from 'antd'

export const Price = ({ range, amount, textColor }) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="mb-2">
        <Typography.Text className={`!text-[${textColor}] text-[15px]`} style={{color: textColor}}>
          {range}
        </Typography.Text>
      </div>
      <div>
        <button className="bg-[#313036] w-[135px] h-[40px] border-solid border-[1px] border-[linear-gradient(165.4deg, rgba(0, 0, 0, 0.2) -10.07%, rgba(255, 255, 255, 0) 89.61%)] rounded-[60px] flex items-center justify-center gap-1">
          <Typography.Text className={`text-xl font-semibold !text-[${textColor}]`} style={{color: textColor}}>{amount}</Typography.Text>
          <Icon name="dollar16" />
        </button>
      </div>
    </div>
  )
}