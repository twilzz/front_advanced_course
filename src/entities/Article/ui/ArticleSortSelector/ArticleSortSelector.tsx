import { ArticleSortField } from 'entities/Article/model/types/article'
import { t } from 'i18next'
import { memo, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { SortOrder } from 'shared/types'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
  className?: string
  order: SortOrder
  sort: ArticleSortField
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo(
  ({
    className,
    order,
    sort,
    onChangeOrder,
    onChangeSort,
  }: ArticleSortSelectorProps) => {
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        { value: 'asc', content: t('возрастанию') },
        { value: 'desc', content: t('убыванию') },
      ],
      [t]
    )
    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        { value: ArticleSortField.CREATED, content: t('дата создания') },
        { value: ArticleSortField.TITLE, content: t('названию') },
        { value: ArticleSortField.VIEWS, content: t('просмотрам') },
      ],
      [t]
    )

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          value={sort}
          onChange={onChangeSort}
          options={sortFieldOptions}
          label={t('Сортировать по')}
        />
        <Select
          className={cls.order}
          value={order}
          onChange={onChangeOrder}
          options={orderOptions}
          label={t('По')}
        />
      </div>
    )
  }
)
