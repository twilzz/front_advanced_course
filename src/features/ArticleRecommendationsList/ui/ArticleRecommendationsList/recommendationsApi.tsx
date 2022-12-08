import { rtkApi } from 'shared/api/rtkApi'

export const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticlesRecommendationsList: build.query({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})
