import { Icon } from 'src/components/common/icons'
import { numberWithCommas } from 'src/components/home/Prize/helper'
import { HistoryTicketModal } from '../../ChooseNumber/elements/HistoryTicketModal'
import { useState } from 'react'

export const NumberTicket = ({ numberTicket, history }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="flex items-center justify-center cursor-pointer gap-4"
        onClick={() => setOpen(true)}
      >
        {numberWithCommas(numberTicket)} Tickets <Icon name="nextArrow" />
      </div>
      <HistoryTicketModal open={open} setOpen={setOpen} history={history} />
    </>
  )
}
