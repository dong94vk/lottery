import { Row } from 'antd'
import { GameZone } from 'src/components/bigAndSmall/GameZone'

export const BigAndSmall = () => {
  return (<Row className="lottery-page flex flex-col items-center justify-center w-full">
    <GameZone />
    <GameZone />
  </Row>)
}