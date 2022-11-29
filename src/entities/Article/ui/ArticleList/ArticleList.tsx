import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { List, ListRowProps, WindowScroller } from 'react-virtualized'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { PAGE_ID } from 'widgets/Page/Page'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ))

export const ArticleList = memo(
  ({
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target,
  }: ArticleListProps) => {
    const { t } = useTranslation()

    const isBig = view === ArticleView.BIG

    const itemsPerRow = isBig ? 1 : 3

    const rowCounts = isBig
      ? articles.length
      : Math.ceil(articles.length / itemsPerRow)

    const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
      const items = []
      const fromIndex = index * itemsPerRow
      const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)
      for (let i = fromIndex; i < toIndex; i++) {
        items.push(
          <ArticleListItem
            className={cls.card}
            article={articles[i]}
            view={view}
            target={target}
            key={`str+${i}`}
          />
        )
      }
      return (
        <div key={key} style={style} className={cls.row}>
          {items}
        </div>
      )
    }

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t('Статьи не найдены')} />
        </div>
      )
    }

    return (
      <WindowScroller
        scrollElement={document.getElementById(PAGE_ID) as Element}
      >
        {({
          height,
          width,
          registerChild,
          scrollTop,
          isScrolling,
          onChildScroll,
        }) => (
          <div
            ref={registerChild}
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          >
            <List
              autoHeight
              scrollTop={scrollTop}
              onScroll={onChildScroll}
              height={height ?? 700}
              rowCount={rowCounts}
              rowHeight={isBig ? 700 : 330}
              rowRenderer={rowRenderer}
              width={width ? width - 80 : 700}
            />
            {isLoading && getSkeletons(view)}
          </div>
        )}
      </WindowScroller>
    )
  }
)
