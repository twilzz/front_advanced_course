import { Comment } from 'entities/Comment'
import { memo } from 'react'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { VStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'
import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = memo(
  ({ className, comment, isLoading }: CommentCardProps) => {
    if (isLoading) {
      return (
        <VStack
          gap="16"
          max
          className={classNames(cls.CommentCard, {}, [className])}
        >
          <div className={cls.header}>
            <Skeleton height={30} width={30} border="50%" />
            <Skeleton className={cls.username} height={16} width={110} />
          </div>
          <Skeleton className={cls.text} height={60} width={'100%'} />
        </VStack>
      )
    }

    if (!comment) return null

    return (
      <VStack
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className])}
      >
        <AppLink
          className={cls.header}
          to={`${RoutePaths.profile}${comment?.user.id}`}
        >
          {comment?.user?.avatar ? (
            <Avatar size={30} src={comment?.user?.avatar} />
          ) : null}
          <Text className={cls.username} title={comment?.user.username} />
        </AppLink>
        <Text className={cls.text} text={comment?.text} />
      </VStack>
    )
  }
)
