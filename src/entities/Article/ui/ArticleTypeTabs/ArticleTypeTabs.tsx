import { ArticleType } from 'entities/Article/model/const/article'
import { memo, useCallback, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo(
  ({ className, value, onChangeType }: ArticleTypeTabsProps) => {
    const tabsFromTypes = useMemo<TabItem[]>(
      () => [
        {
          value: ArticleType.IT,
          content: 'IT',
        },
        {
          value: ArticleType.ECONOMICS,
          content: 'ECONOMICS',
        },
        {
          value: ArticleType.SCIENCE,
          content: 'SCIENCE',
        },
        {
          value: ArticleType.ALL,
          content: 'ALL',
        },
      ],
      []
    )

    const onTabClick = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as ArticleType)
      },
      [onChangeType]
    )

    return (
      <Tabs
        className={classNames('', {}, [className])}
        tabs={tabsFromTypes}
        value={''}
        onTabClick={onTabClick}
      />
    )
  }
)
