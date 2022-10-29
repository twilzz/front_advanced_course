import { useCallback } from '@storybook/addons'
import { Currency } from 'entities/Currency'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'

interface currencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readOnly?: boolean
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
]

export const CurrencySelect = memo(
  ({ className, value, onChange, readOnly }: currencySelectProps) => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(() => {
      onChange?.(value as Currency)
    }, [])

    return (
      <Select
        className={classNames('', {}, [className])}
        label={t('Укажите валюту')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readOnly={readOnly}
      />
    )
  }
)
