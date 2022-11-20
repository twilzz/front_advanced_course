import { ArticleDetailed } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddNewComment'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from 'pages/ArticleDetailedPage/model/selectors/comments'
import { addCommentForArticle } from 'pages/ArticleDetailedPage/model/services/addComentForArticle/addCommentForArticle'
import { fetchArticleCommentsById } from 'pages/ArticleDetailedPage/model/services/fetchArticleCommentsById/fetchArticleCommentsById'
import {
  articleCommentsReducer,
  getArticleComments,
} from 'pages/ArticleDetailedPage/model/slices/ArticleCommentsSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialeffect'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Page } from 'shared/ui/Page/Page'
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
  const navigate = useNavigate()

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch]
  )

  const onBackToList = useCallback(() => {
    navigate(RoutePaths.articles)
  }, [navigate])

  useInitialEffect(() => {
    dispatch(fetchArticleCommentsById(id))
  })

  if (!id)
    return (
      <Page className={classNames(cls.ArticleDetailedPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailedPage, {}, [className])}>
        <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetailed id={id} />
        <Text className={cls.commentTitle} title={'Комментарии'} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={isLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailedPage)
