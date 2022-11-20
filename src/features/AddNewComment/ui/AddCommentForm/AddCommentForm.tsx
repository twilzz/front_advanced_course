import {
  getAddCommentError,
  getAddCommentText,
} from 'features/AddNewComment/model/selectors/addCommentSelector'
import {
  addCommentActions,
  addCommentReducer,
} from 'features/AddNewComment/model/slices/addCommentSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addNewComment: addCommentReducer,
}

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation()
    const text = useSelector(getAddCommentText)
    const error = useSelector(getAddCommentError)
    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentActions.setText(value))
      },
      [dispatch]
    )
    const onSendHandler = useCallback(() => {
      onSendComment(text || '')
      onCommentTextChange('')
    }, [onSendComment, onCommentTextChange, text])

    return (
      <DynamicModuleLoader reducers={reducers}>
        <div className={classNames(cls.AddCommentForm, {}, [className])}>
          <Input
            className={cls.input}
            onChange={onCommentTextChange}
            value={text}
            placeholder={t('Введите текст комментария')}
          />
          <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
            {t('Отправить')}
          </Button>
        </div>
      </DynamicModuleLoader>
    )
  }
)

export default AddCommentForm
