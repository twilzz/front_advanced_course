import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './SidebarItem.module.scss'
import { SidebarItemType } from 'widgets/Sidebar/model/items'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <item.icon className={cls.icon} />
      <span className={cls.links}>{item?.text}e</span>
    </AppLink>
  )
})
