import { getLoginState } from 'entities/User/model/selector/getLoginState/getLoginState'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice'
import { t } from 'i18next'
import { memo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useDispatch()
  const { username, password, error, isLoading } = useSelector(getLoginState)

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, username, password])

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title="Форма авторизации" />
      {error && <Text text={error} theme={TextTheme.ERROR} />}
      <Input
        type="text"
        autoFocus
        placeholder={t('Ведите Username')}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        placeholder={t('Ведите пароль')}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        disabled={isLoading}
        theme={ButtonTheme.OUTLINE}
        className={cls.loginBtn}
        onClick={onLoginClick}
      >
        Войти
      </Button>
    </div>
  )
})
