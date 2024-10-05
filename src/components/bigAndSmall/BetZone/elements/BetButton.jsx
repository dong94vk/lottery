import { Typography } from 'antd'
import { Icon } from 'src/components/common/icons'

export const BetButton = (props) => {
  const { title, prize, selected, textColor, onClick } = props
  const selectedClass =
    'border-2 border-white shadow-[inset_0_0_24px_0_#FFFFFF40] bg-[#4b4d54]'
  return (
    <div
      className={`flex flex-col w-[210px] h-[140px] rounded-[20px] shadow-[inset_0_0_32px_0_#FFFFFF26] p-3 cursor-pointer relative ${
        selected ? selectedClass : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-around">
        <Typography.Text
          className={`uppercase text-xl font-medium`}
          style={{ color: textColor }}
        >
          {title}
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
        {!selected && (
          <Typography.Text className="text-white font-semibold text-[18px] w-[120px] h-[40px] rounded-t-[18px] shadow-[inset_0_4px_6px_0_#FFFFFF80] flex justify-center items-center">
            Pick
          </Typography.Text>
        )}
        {selected && (
          <Typography.Text className="text-white font-normal text-[18px] w-[120px] h-[40px] flex justify-center items-center">
            Picked
          </Typography.Text>
        )}
      </div>
    </div>
  )
}
