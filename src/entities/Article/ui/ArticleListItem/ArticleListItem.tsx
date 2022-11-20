import { useCallback } from '@storybook/addons'
import { t } from 'i18next'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { useHover } from 'shared/lib/hooks/useHover'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Card } from 'shared/ui/Card/Card'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text } from 'shared/ui/Text/Text'
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlock/ArticleTextBlock'
import cls from './ArticleListItem.module.scss'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
}

export const ArticleListItem = memo(
  ({ className, article, view }: ArticleListItemProps) => {
    const [isHovered, bindHover] = useHover()
    const navigate = useNavigate()

    const onOpenArticle = useCallback(() => {
      navigate(RoutePaths.article_detailed + article.id)
    }, [article.id, navigate])

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    )

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT
      ) as ArticleTextBlock

      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card onClick={onOpenArticle} className={cls.card}>
            <div className={cls.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text title={article.title} className={cls.title} />
            {types}
            <img src={article.img} className={cls.img} alt={article.title} />
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <div className={cls.footer}>
              <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
                {t('Читать далее')}
              </Button>
              {views}
            </div>
          </Card>
        </div>
      )
    }

    return (
      <div
        {...bindHover}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card onClick={onOpenArticle} className={cls.card}>
          <div className={cls.imageWrapper}>
            <img alt={article.title} src={article.img} className={cls.img} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text text={article.title} className={cls.title} />
        </Card>
      </div>
    )
  }
)
