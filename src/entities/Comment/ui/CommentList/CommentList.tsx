import { Comment } from 'entities/Comment'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import cls from './CommentList.module.scss'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo(
  ({ className, comments, isLoading }: CommentListProps) => {
    if (isLoading) {
      return (
        <div className={classNames(cls.CommentList, {}, [className])}>
          <CommentCard isLoading className={cls.comment} />
          <CommentCard isLoading className={cls.comment} />
          <CommentCard isLoading className={cls.comment} />
        </div>
      )
    }

    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              isLoading={isLoading}
              comment={comment}
              className={cls.comment}
            />
          ))
        ) : (
          <Text text={'Комментарии отсутствуют'} />
        )}
      </div>
    )
  }
)
