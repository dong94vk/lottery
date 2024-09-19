import { Col } from 'antd'
import { Icon } from 'src/components/common/icons'
import { LotteryNumber } from 'src/components/lottery/ChooseNumber/elements/Number'

export const ChoseNumberElement = (props) => {
  const { index, numbers, handleDelete, className } = props

  const onClickDelete = () => {
    handleDelete(index)
  }

  return (
    <Col
      span={24}
      className={`flex items-center justify-center gap-8 ${className}`}
    >
      {index + 1}
      <div className="flex gap-2">
        {numbers?.map((number) => (
          <LotteryNumber number={number} key={index} />
        ))}
      </div>
      {handleDelete && (
        <Icon name="trash" onClick={onClickDelete} className="cursor-pointer" />
      )}
    </Col>
  )
}
