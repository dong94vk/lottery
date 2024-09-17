import { Icon } from 'src/components/common/icons'
import { numberWithCommas } from 'src/components/home/Prize/helper'

export const PrizePot = ({ prize }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-2xl text-[#FCD938]">
      {numberWithCommas(prize)} <Icon name="dollar16" />
    </div>
  )
}
