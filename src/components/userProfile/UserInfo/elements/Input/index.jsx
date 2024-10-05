import { Input, Typography } from 'antd'

export const UserProfileInput = (props) => {
  const {
    text,
    value,
    disabled,
    type,
    placeholder,
    prefix,
    suffix,
    onChange,
    inputClassName,
  } = props
  return (
    <div className="flex items-center w-full">
      <Typography.Text className="text-white font-medium text-[16px] w-1/4">
        {text}:{' '}
      </Typography.Text>
      <Input
        className={`!text-white w-4/5 !border-[#181C28] h-[46px] !bg-[#181C28] ${inputClassName}`}
        value={value}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
