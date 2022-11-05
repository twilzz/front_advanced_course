import { AboutPage } from 'pages/AboutPage'
import { ArticleDetailedPage } from 'pages/ArticleDetailedPage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILED = 'article_detailed',
  NOT_FOUND = 'not_found',
}

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILED]: '/article_detailed',
  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePaths.about,
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePaths.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePaths.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILED]: {
    path: `${RoutePaths.article_detailed}:id`,
    element: <ArticleDetailedPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
}
