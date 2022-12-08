import { memo, Suspense, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { VStack } from 'shared/ui/Stack'

import { LangSwitcher } from 'widgets/LangSwitcher'
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemsList = useSelector(getSidebarItems)
  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  const itemList = sidebarItemsList.map((item) => (
    <SidebarItem item={item} collapsed={collapsed} key={item.path} />
  ))

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        data-testid="sidebar-toggle"
        className={cls.collapsedBtn}
        onClick={onToggle}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <VStack gap="8" className={cls.items}>
        {itemList}
      </VStack>
      <div className={cls.switchers}>
        <Suspense fallback={''}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </Suspense>
      </div>
    </aside>
  )
})
