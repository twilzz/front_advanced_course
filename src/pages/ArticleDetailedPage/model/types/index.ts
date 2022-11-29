import { ArticleCommentsSchema } from './ArticleCommentsSchema'
import { ArticleRecommendationSchema } from './ArticleRecommendationSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleCommentsSchema
  recommendations: ArticleRecommendationSchema
}
