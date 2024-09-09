import { Row } from 'antd'
import { GameZone } from 'src/components/bigAndSmall/GameZone'
import useGame from 'src/store/hooks/game'
import { useEffect } from 'react'
import { History } from 'src/components/bigAndSmall/History'

export const BigAndSmall = () => {

  const { actions } = useGame()
  useEffect(() => {
    actions.getSetting('TX1')
    actions.getHistory({ code: 'TX1', page: 1, limit: 30 })
  }, [])

  return (
  <Row className="lottery-page flex flex-col items-center justify-center w-full">
    <GameZone />
    <History />
  </Row>
  )
}