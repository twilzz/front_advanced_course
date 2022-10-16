import { Counter } from 'entities/Counter'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const onChange = (val: string) => {
    setValue(val)
  }

  return (
    <div>
      {t('Главная страница')}
      <Counter />
    </div>
  )
}

export default MainPage
