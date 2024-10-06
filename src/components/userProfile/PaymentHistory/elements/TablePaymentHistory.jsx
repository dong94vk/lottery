import { CheckCircleOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Icon } from 'src/components/common/icons'
import { PrizePot } from 'src/components/lottery/History/elements/PrizePot'
import useAuth from 'src/store/hooks/authentication'
import { apiRefreshPayment } from 'src/store/sagas/authentication'

export const PaymentHistoryTable = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const {
    actions: authAction,
    data: { paymentHistories },
  } = useAuth()

  useEffect(() => {
    fetchData(limit, page)
  }, [limit, page])

  const fetchData = (limit, page) => {
    authAction.getListPayment({ limit, page })
  }

  const onCheckStatus = async (history) => {
    if (history.action.toLowerCase() === 'deposit') {
      await apiRefreshPayment({ id: history.id })
      authAction.getAccountInfo()
    }
    await fetchData()
  }

  const handleChangePagination = (pageChange, pageSize) => {
    setPage(pageChange)
    setLimit(pageSize)
  }

  const paginateItemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Icon name="paginatePrevious" />
    }
    if (type === 'next') {
      return <Icon name="paginateNext" />
    }
    return originalElement
  }

  return (
    <>
      <table className="bg-transparent table-auto w-full">
        <thead className="border-b-2 border-[#66686C60] border-dashed text-center table-header text-[16px] font-medium">
          <tr>
            <td className="pb-5">Time</td>
            <td className="pb-5">Amount</td>
            <td className="pb-5">Deposit/Withdraw</td>
            <td className="pb-5">Status</td>
            <td className="pb-5">Action</td>
          </tr>
        </thead>
        <tbody>
          {paymentHistories?.map((data, index) => {
            const history = data.attributes
            return (
              <tr className="text-center" key={`payment-history-${index}`}>
                <td className="pt-5">
                  {dayjs(history.created_at).format('DD/MM/YYYY')}
                </td>
                <td className="pt-5">
                  <PrizePot prize={history.amount} />
                </td>
                <td className="pt-5">{history.action}</td>
                <td className="pt-5 uppercase">{history.status}</td>
                <td
                  className="pt-5 flex items-center justify-center gap-3"
                  onClick={() => onCheckStatus({ ...history, id: data?.id })}
                >
                  <CheckCircleOutlined />
                  <span className="uppercase">check status</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="w-full mt-3 flex justify-end">
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={handleChangePagination}
          itemRender={paginateItemRender}
        />
      </div>
    </>
  )
}
