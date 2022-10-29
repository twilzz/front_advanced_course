import { memo, Suspense, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { SidebarItemsList } from 'widgets/Sidebar/model/items'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  const itemList = useMemo(
    () =>
      SidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed]
  )
  return (
    <div
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
      <div className={cls.items}>{itemList}</div>
      <div className={cls.switchers}>
        <Suspense fallback={''}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </Suspense>
      </div>
    </div>
  )
})
