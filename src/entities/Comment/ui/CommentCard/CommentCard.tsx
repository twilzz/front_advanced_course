import { Comment } from 'entities/Comment'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Text } from 'shared/ui/Text/Text'
import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment: Comment
  isLoading?: boolean
}

export const CommentCard = memo(
  ({ className, comment, isLoading }: CommentCardProps) => {
    const {
      id,
      text,
      user: { username, avatar },
    } = comment

    if (isLoading) {
      return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
          <div className={cls.header}>
            <Skeleton height={30} width={30} border="50%" />
            <Skeleton className={cls.username} height={16} width={110} />
          </div>
          <Skeleton className={cls.text} height={60} width={'100%'} />
        </div>
      )
    }

    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          {avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}
          <Text className={cls.username} title={username} />
        </div>
        <Text className={cls.text} text={text} />
      </div>
    )
  }
)
