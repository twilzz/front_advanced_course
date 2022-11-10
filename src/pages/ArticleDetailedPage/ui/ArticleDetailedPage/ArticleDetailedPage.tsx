import { ArticleDetailed } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from 'pages/ArticleDetailedPage/model/selectors/comments'
import { fetchArticleCommentsById } from 'pages/ArticleDetailedPage/model/services/fetchArticleCommentsById/fetchArticleCommentsById'
import {
  articleCommentsReducer,
  getArticleComments,
} from 'pages/ArticleDetailedPage/model/slices/ArticleCommentsSlice'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialeffect'
import { Text } from 'shared/ui/Text/Text'
import cls from './ArticleDetailedPage.module.scss'

interface ArticleDetailedPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleComments: articleCommentsReducer,
}

const ArticleDetailedPage = (props: ArticleDetailedPageProps) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsIsLoading)
  const commentsError = useSelector(getArticleCommentsError)
  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchArticleCommentsById(id))
  })

  if (!id)
    return (
      <div className={classNames(cls.ArticleDetailedPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailedPage, {}, [className])}>
        <ArticleDetailed id={id} />
        <Text className={cls.commentTitle} title={'Комментарии'} />
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailedPage)
