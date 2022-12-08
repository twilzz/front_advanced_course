import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleType,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelector,
} from 'entities/Article'

import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList'
import { articlePageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useDebounce } from 'shared/lib/hooks/useDebounce'
import { SortOrder } from 'shared/types'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input/Input'
import cls from './ArticlePageFilters.module.scss'

interface ArticlePageFiltersProps {
  className?: string
}

export const ArticlePageFilters = memo(
  ({ className }: ArticlePageFiltersProps) => {
    const { t } = useTranslation()
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)
    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlePageActions.setView(view))
      },
      [dispatch]
    )
    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(newSort))
        dispatch(articlePageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )
    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlePageActions.setOrder(newOrder))
        dispatch(articlePageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )
    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlePageActions.setSearch(search))
        dispatch(articlePageActions.setPage(1))
        debouncedFetchData()
      },
      [dispatch, debouncedFetchData]
    )
    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlePageActions.setType(value))
        dispatch(articlePageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )

    return (
      <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector onViewClick={onChangeView} view={view} />
        </div>
        <Card className={cls.search}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('Поиск')}
          />
        </Card>
        <ArticleTypeTabs value={type} onChangeType={onChangeType} />
      </div>
    )
  }
)
