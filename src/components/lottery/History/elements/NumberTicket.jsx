import { Icon } from 'src/components/common/icons'
import { numberWithCommas } from 'src/components/home/Prize/helper'

export const NumberTicket = ({ numberTicket }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {numberWithCommas(numberTicket)} Tickets <Icon name="nextArrow" />
    </div>
  )
}
