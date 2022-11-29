import { Comment } from 'entities/Comment'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo(
  ({ className, comments, isLoading }: CommentListProps) => {
    if (isLoading) {
      return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </VStack>
      )
    }

    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              isLoading={isLoading}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <Text text={'Комментарии отсутствуют'} />
        )}
      </VStack>
    )
  }
)
