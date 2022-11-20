import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import AboutIcon from 'shared/assets/icons/about.svg'
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg'
import MainIcon from 'shared/assets/icons/main.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { SidebarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemList: SidebarItemType[] = [
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
  ]
  if (userData) {
    sidebarItemList.push(
      {
        path: RoutePaths.profile + userData?.id,
        text: 'Profile page',
        icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: RoutePaths.articles,
        text: 'Articles page',
        icon: ArticlesIcon,
        authOnly: true,
      }
    )
  }

  return sidebarItemList
})
