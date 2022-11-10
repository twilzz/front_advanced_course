import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetails'
import { fetchArticleByID } from 'entities/Article/model/services/fetchArticleByID/fetchArticleByID'
import {
  ArticleBlock,
  ArticleBlockType,
} from 'entities/Article/model/types/article'
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Icon } from 'shared/ui/Icon/Icon'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleImageBlockComponent } from '../ArticleImageBlock/ArticleImageBlock'
import { ArticleTextBlockComponent } from '../ArticleTextBlock/ArticleTextBlock'
import cls from './ArticleDetailed.module.scss'

interface ArticleDetailedProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetailed = memo(
  ({ className, id }: ArticleDetailedProps) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const article = useSelector(getArticleDetailsData)
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const error = useSelector(getArticleDetailsError)

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockComponent
              key={block?.id}
              block={block}
              className={cls.block}
            />
          )

        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockComponent
              key={block?.id}
              block={block}
              className={cls.block}
            />
          )

        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockComponent
              key={block?.id}
              block={block}
              className={cls.block}
            />
          )

        default:
          return null
      }
    }, [])

    let content

    if (isLoading) {
      content = (
        <div>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border={'50%'}
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width={'100%'} height={200} />
        </div>
      )
    } else if (error) {
      content = (
        <Text
          title={t('Произошла ошибка при загрузке страницы')}
          align={TextAlign.CENTER}
        />
      )
    } else {
      content = (
        <>
          <div className={cls.avatarWrapper}>
            <Avatar size={200} src={article?.img} className={cls.avatar} />
          </div>

          <Text
            className={cls.title}
            size={TextSize.XL}
            title={article?.title}
            text={article?.subtitle}
          />

          <div className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={EyeIcon} />

            <Text text={String(article?.views)} />
          </div>

          <div className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={CalendarIcon} />

            <Text text={article?.createdAt} />
          </div>
          {article?.blocks.map(renderBlock)}
        </>
      )
    }

    useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
        dispatch(fetchArticleByID(id))
      }
    }, [dispatch, id])

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
        <div className={classNames(cls.ArticleDetailed, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>
    )
  }
)
