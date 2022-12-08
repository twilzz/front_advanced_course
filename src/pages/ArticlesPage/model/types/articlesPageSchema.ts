import { EntityState } from '@reduxjs/toolkit'
import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from 'entities/Article'

import { SortOrder } from 'shared/types'

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string
  page: number
  limit?: number
  hasMore: boolean

  _inited: boolean

  //filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType
}
