import { Row, Typography } from 'antd'
import { Icon } from 'src/components/common/icons'
import { formatHistory, getBigAndSmallResult } from '../helper'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { apiGetHistory } from 'src/store/sagas/bigAndSmall'
import { formatDataOldResult } from 'src/store/slice/bigAndSmall/type'
import useBigAndSmall from 'src/store/hooks/bigAndSmall'

export const OldResult = () => {
  const [oldResult, setOldResult] = useState([])
  const [focus, setFocus] = useState(null)
  const { data } = useBigAndSmall()
  const [page, setPage] = useState(1)
  useEffect(() => {
    fetchData(page)
    if(page === 1) {
      setFocus(1)
    } else {
      setFocus(null)
    }

  }, [page, data])

  const fetchData = async (page) => {
    const res = await apiGetHistory({ code: 'TX1', page: page, limit: 10 })
    const histories = formatDataOldResult(res?.data)
    setOldResult(histories)
  }

  const handleChangePage = (arrow) => {
    if (arrow === 'next' && page > 1) setPage(page - 1)
    if (arrow === 'prev') setPage(page + 1)
  }

  return (<>
      <Typography.Title level={3} className="!text-white w-full !mb-[-20px]">
        Old results
      </Typography.Title>
      <Row
        gutter={[24, 24]}
        className="w-full bg-[#1f2129] rounded-[20px] overflow-hidden p-3 flex justify-center items-center gap-5"
      >
        <Icon name="previous" onClick={() => handleChangePage('prev')} />
        <table className="bg-transparent table-auto w-3/4 mt-3">
          <thead className="border-b-2 border-[#66686C60] text-center table-header text-[16px] font-medium">
          <tr>
            <td className="pb-3">Session</td>
            {formatHistory(oldResult)?.map((history, index) => (<td
                className={`pb-3`}
                onClick={() => setFocus(index)}
                key={`old-result-${history.session}`}
              >
                <span className={`${focus === index ? 'bg-[#56595f] p-3 rounded-2xl' : ''}`}>#{history.session}</span>
              </td>))}
          </tr>
          </thead>
          <tbody className="pt-4 pb-4">
          <tr className="text-center text-base font-semibold">
            <td>Result</td>
            {formatHistory(oldResult)?.map((history, index) => {
              if (isEmpty(history.winning)) {
                return (
                  <td
                    // onClick={() => setFocus(index)}
                    key={`oldResult-${index}`}
                    className={`${focus === index ? 'bg-[#56595f] rounded-2xl' : ''}`}
                  >
                    <span> ? </span>
                  </td>)
              }
              return (<td
                  // onClick={() => setFocus(index)}
                  key={`oldResult-${index}`}
                  className={`${focus === index ? 'bg-[#56595f] rounded-2xl' : ''}`}
                >
                  <span >
                    <span>{getBigAndSmallResult(history.winning)}</span>
                    <br />
                    <span>({history.winning?.replaceAll(',', '-')})</span>
                  </span>
                </td>)
            })}
          </tr>
          </tbody>
        </table>
        <Icon name="next" onClick={() => handleChangePage('next')} />
      </Row>
    </>)
}
