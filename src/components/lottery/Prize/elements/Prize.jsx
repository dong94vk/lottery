import { Typography } from 'antd'
import { Icon } from 'src/components/common/icons/Index'
import { numberWithCommas } from '../helper'

export const PrizeNumber = (props) => {
  const { icon, prize, name, className, onClick } = props
  return (
    <div
      className={`w-[232px] h-[242px] ${className}`}
      onClick={() => onClick(props)}
    >
      <div className="prize-content w-full pt-[80px] h-[162px] rounded-[20px] bg-[#2a3038] relative">
        <div className="prize-content__icon absolute w-[133px] h-[133px] top-[-100%] left-[-35%]">
          <Icon name={icon} />
        </div>
        <div className="prize-content__price flex justify-center">
          <Typography.Text className="!text-white text-2xl font-bold">
            ${numberWithCommas(prize)}
          </Typography.Text>
        </div>
        <div className="prize_content__name flex justify-center flex-end w-full absolute bottom-0">
          <div
            className={`shadow-[inset_0_4px_6px_0_#6098FF80] w-[137px] h-[40px] rounded-[36px_36px_0_0] flex justify-center items-center`}
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}
