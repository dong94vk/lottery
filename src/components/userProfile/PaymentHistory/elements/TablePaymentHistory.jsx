import dayjs from 'dayjs'
import { PrizePot } from 'src/components/lottery/History/elements/PrizePot'

export const PaymentHistoryTable = () => {
  return (
    <>
      <table className="bg-transparent table-auto w-full">
        <thead className="border-b-2 border-[#66686C60] border-dashed text-center table-header text-[16px] font-medium">
          <tr>
            <td className="pb-5">Time</td>
            <td className="pb-5">Amount</td>
            <td className="pb-5">Deposit/Withdraw</td>
            <td className="pb-5">Status</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="pt-5">
              {dayjs('2024-03-24T17:00:00z').format('DD/MM/YYYY')}
            </td>
            <td className="pt-5">
              <PrizePot prize={'1,000,000'} />
            </td>
            <td className="pt-5">Withdraw</td>
            <td className="pt-5">Waiting</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
