import { Suspense, useState } from 'react'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Sidebar.module.scss'
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed(!collapsed)
  }
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
      <div className={cls.items}>
        <div>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePaths.main}
            className={cls.item}
          >
            <MainIcon className={cls.icon} />
            <span className={cls.links}>Main page</span>
          </AppLink>
        </div>

        <div>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePaths.about}
            className={cls.item}
          >
            <AboutIcon className={cls.icon} />
            <span className={cls.links}>About page</span>
          </AppLink>
        </div>
      </div>
      <div className={cls.switchers}>
        <Suspense fallback={''}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </Suspense>
      </div>
    </div>
  )
}
