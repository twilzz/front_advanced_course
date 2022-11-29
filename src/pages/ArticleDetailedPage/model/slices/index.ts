import { combineReducers } from '@reduxjs/toolkit'
import { ArticleDetailsPageSchema } from '../types'
import { articleCommentsReducer } from './ArticleCommentsSlice'
import { articleRecommendationReducer } from './ArticleRecommendationSlice'

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleRecommendationReducer,
    comments: articleCommentsReducer,
  })
