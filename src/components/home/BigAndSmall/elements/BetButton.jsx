import { Typography } from 'antd'
import { Icon } from 'src/components/common/icons'

export const BetButton = (props) => {
  const { title, joinNumber, prize, textColor, onClick } = props
  return (
    <div
      className="flex flex-col w-[210px] h-[140px] rounded-[20px] shadow-[inset_0_0_32px_0_#FFFFFF26] p-3 cursor-pointer relative"
      onClick={onClick}
    >
      <div className="flex justify-around">
        <Typography.Text
          className={`uppercase text-xl font-medium`}
          style={{ color: textColor }}
        >
          {title}
        </Typography.Text>
        <Typography.Text className="text-white text-base font-normal">
          {joinNumber} join
        </Typography.Text>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Typography.Text
          className="text-[28px] font-bold"
          style={{ color: textColor }}
        >
          {prize}
        </Typography.Text>
        <Icon name="dollar24" />
      </div>
      <div className="flex w-full justify-center items-center absolute bottom-0 left-0">
        <Typography.Text className="text-white font-semibold text-[18px] w-[120px] h-[40px] rounded-t-[18px] shadow-[inset_0_4px_6px_0_#FFFFFF80] flex justify-center items-center">
          Join
        </Typography.Text>
      </div>
    </div>
  )
}
