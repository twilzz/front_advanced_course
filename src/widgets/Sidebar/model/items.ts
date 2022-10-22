import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import React, { ReactElement, SVGProps } from 'react'

export interface SidebarItemType {
  path: string
  text: string
  icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePaths.main,
    text: 'Main page',
    icon: MainIcon,
  },
  {
    path: RoutePaths.about,
    text: 'About page',
    icon: AboutIcon,
  },
  {
    path: RoutePaths.profile,
    text: 'Profile page',
    icon: ProfileIcon,
  },
]
