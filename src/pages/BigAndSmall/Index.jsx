import { Row } from 'antd'
import { GameZone } from 'src/components/bigAndSmall/BetZone'
import useBigAndSmall from 'src/store/hooks/bigAndSmall'
import { useEffect } from 'react'
import { History } from 'src/components/bigAndSmall/History'

export const BigAndSmall = () => {
  const { actions } = useBigAndSmall()
  useEffect(() => {
    actions.getSetting('TX1')
    actions.getHistory({ code: 'TX1', page: 1, limit: 11 })
  }, [])

  return (
    <Row className="lottery-page flex flex-col items-center justify-center w-full gap-8">
      <GameZone />
      <History />
    </Row>
  )
}
