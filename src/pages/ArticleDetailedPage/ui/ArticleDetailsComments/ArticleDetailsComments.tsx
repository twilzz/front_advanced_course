import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddNewComment'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from 'pages/ArticleDetailedPage/model/selectors/comments'
import { addCommentForArticle } from 'pages/ArticleDetailedPage/model/services/addComentForArticle/addCommentForArticle'
import { getArticleComments } from 'pages/ArticleDetailedPage/model/slices/ArticleCommentsSlice'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Text, TextSize } from 'shared/ui/Text/Text'

interface ArticleDetailsCommentsProps {
  className?: string
  id: string
}

export const ArticleDetailsComments = memo(
  ({ className, id }: ArticleDetailsCommentsProps) => {
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const isLoading = useSelector(getArticleCommentsIsLoading)
    const commentsError = useSelector(getArticleCommentsError)

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text))
      },
      [dispatch]
    )
    return (
      <div className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={'Комментарии'} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    )
  }
)
