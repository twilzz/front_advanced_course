import { ChangeEvent, memo, useMemo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

export const Select = memo((props: SelectProps) => {
  const { className, label, options, onChange, value, readOnly } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e.target.value)
  }

  const optionList = useMemo(() => {
    return options?.map((option) => (
      <option className={cls.option} value={option.value} key={option.value}>
        {option.content}
      </option>
    ))
  }, [options])

  const mods: Mods = {}

  return (
    <div className={classNames(cls.wrapper, mods, [className])}>
      {label && <span className={cls.label}>{label + '>'}</span>}
      <select
        disabled={readOnly}
        className={cls.select}
        onChange={onChangeHandler}
        value={value}
      >
        {optionList}
      </select>
    </div>
  )
})
