import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails'
import { getUserAuthData } from 'entities/User'
import { getCanEditArticle } from 'pages/ArticleDetailedPage/model/selectors/article'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(
  ({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const userData = useSelector(getUserAuthData)
    const article = useSelector(getArticleDetailsData)
    const canEdit = useSelector(getCanEditArticle)

    const onBackToList = useCallback(() => {
      navigate(RoutePaths.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
      navigate(RoutePaths.article_detailed + article?.id + 'edit')
    }, [navigate, article?.id])

    return (
      <HStack justify="between" max className={classNames('', {}, [className])}>
        <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
          {t('Назад к списку')}
        </Button>
        {canEdit && (
          <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>
            {t('Редактировать')}
          </Button>
        )}
      </HStack>
    )
  }
)
