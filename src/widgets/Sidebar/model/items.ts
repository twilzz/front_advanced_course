import React from 'react'
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/main.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemType {
  path: string
  text: string
  icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
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
    authOnly: true,
  },
  {
    path: RoutePaths.articles,
    text: 'Articles page',
    icon: ArticlesIcon,
    authOnly: true,
  },
]
