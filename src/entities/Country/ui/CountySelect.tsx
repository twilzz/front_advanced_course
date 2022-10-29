import { useCallback } from '@storybook/addons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { Country } from '../model/types/country'

interface countrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readOnly?: boolean
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine },
]

export const CountrySelect = memo(
  ({ className, value, onChange, readOnly }: countrySelectProps) => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(() => {
      onChange?.(value as Country)
    }, [])

    return (
      <Select
        className={classNames('', {}, [className])}
        label={t('Укажите страну')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readOnly={readOnly}
      />
    )
  }
)
