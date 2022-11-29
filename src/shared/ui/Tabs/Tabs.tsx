import { memo, ReactNode, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Card, CardTheme } from '../Card/Card'
import cls from './Tabs.module.scss'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

export const Tabs = memo(
  ({ className, onTabClick, tabs, value }: TabsProps) => {
    const handleClick = useCallback((tab: TabItem) => {
      return () => {
        onTabClick(tab)
      }
    }, [])

    return (
      <div className={classNames(cls.Tabs, {}, [className])}>
        {tabs.map((tab) => (
          <Card
            theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
            key={tab.value}
            className={cls.tab}
            onClick={handleClick(tab)}
          >
            {tab.content}
          </Card>
        ))}
      </div>
    )
  }
)
