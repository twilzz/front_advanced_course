import { ArticleDetailed, ArticleList } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddNewComment'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from 'pages/ArticleDetailedPage/model/selectors/comments'
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
} from 'pages/ArticleDetailedPage/model/selectors/recommendation'
import { addCommentForArticle } from 'pages/ArticleDetailedPage/model/services/addComentForArticle/addCommentForArticle'
import { fetchArticleCommentsById } from 'pages/ArticleDetailedPage/model/services/fetchArticleCommentsById/fetchArticleCommentsById'
import { fetchArticleRecommendations } from 'pages/ArticleDetailedPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageReducer } from 'pages/ArticleDetailedPage/model/slices'
import { getArticleComments } from 'pages/ArticleDetailedPage/model/slices/ArticleCommentsSlice'
import { getArticleRecommendations } from 'pages/ArticleDetailedPage/model/slices/ArticleRecommendationSlice'
import { memo, useCallback } from 'react'
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
import { VStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/Page'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import cls from './ArticleDetailedPage.module.scss'

interface ArticleDetailedPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailedPage = (props: ArticleDetailedPageProps) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading
  )
  const recommendationsError = useSelector(getArticleRecommendationsError)
  const isLoading = useSelector(getArticleCommentsIsLoading)
  const commentsError = useSelector(getArticleCommentsError)
  const dispatch = useAppDispatch()

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch]
  )

  useInitialEffect(() => {
    dispatch(fetchArticleCommentsById(id))
    dispatch(fetchArticleRecommendations())
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
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetailed id={id} />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={'Рекомендуем'}
          />
          <ArticleList
            className={cls.recommendations}
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            target="_blank"
          />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={'Комментарии'}
          />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={isLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailedPage)
