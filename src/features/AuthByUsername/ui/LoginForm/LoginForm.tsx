import { getLoginState } from 'entities/User/model/selector/getLoginState/getLoginState'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import {
  loginActions,
  loginReducer,
} from 'features/AuthByUsername/model/slice/loginSlice'
import { t } from 'i18next'
import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch()

  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

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
  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
    }
  }, [dispatch, username, password, onSuccess])

  return (
    <DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
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
    </DynamicModuleLoader>
  )
})

export default LoginForm
