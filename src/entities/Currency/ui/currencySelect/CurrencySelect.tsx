import { Currency } from 'entities/Currency/model/types/currency'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import Listbox from 'shared/ui/ListBox/ListBox'

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
      <Listbox
        className={classNames('', {}, [className])}
        onChange={onChangeHandler}
        defaultValue={'Укажите валюту'}
        label={'Укажите валюту'}
        value={value}
        items={options}
        direction="top right"
        readOnly={readOnly}
      />
    )
  }
)
