import { ArticleDetailed } from 'entities/Article'
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList'
import { fetchArticleCommentsById } from 'pages/ArticleDetailedPage/model/services/fetchArticleCommentsById/fetchArticleCommentsById'
import { articleDetailsPageReducer } from 'pages/ArticleDetailedPage/model/slices'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialeffect'
import { VStack } from 'shared/ui/Stack'
import { Page } from 'widgets/Page/Page'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
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
  const dispatch = useAppDispatch()

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
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetailed id={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailedPage)
