import { Country, CountrySelect } from 'entities/Country'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Profile } from 'features/EditableProfileCard/model/types/editableProfileCardSchema'
import { useTranslation } from 'react-i18next'

import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { HStack, VStack } from 'shared/ui/Stack'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
  data?: Profile
  error?: string
  isLoading?: boolean
  readOnly?: boolean
  onChangeFirstName?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readOnly,
    onChangeFirstName,
    onChangeLastName,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: true,
  }

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        className={cls.input}
        value={data?.name}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstName}
        readOnly={readOnly}
        data-testid={'ProfileCard.name'}
      />
      <Input
        className={cls.input}
        value={data?.lastname}
        placeholder={t('Ваше фамилия')}
        onChange={onChangeLastName}
        readOnly={readOnly}
        data-testid={'ProfileCard.lastname'}
      />
      <Input
        className={cls.input}
        value={data?.age}
        placeholder={t('Ваш возраст')}
        onChange={onChangeAge}
        readOnly={readOnly}
      />
      <Input
        className={cls.input}
        value={data?.city}
        placeholder={t('Ваш город')}
        onChange={onChangeCity}
        readOnly={readOnly}
      />
      <Input
        className={cls.input}
        value={data?.username}
        placeholder={t('Ваш имя пользователя')}
        onChange={onChangeUsername}
        readOnly={readOnly}
      />
      <Input
        className={cls.input}
        value={data?.avatar}
        placeholder={t('Ваш аватар')}
        onChange={onChangeAvatar}
        readOnly={readOnly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readOnly={readOnly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readOnly={readOnly}
      />
    </VStack>
  )
}
