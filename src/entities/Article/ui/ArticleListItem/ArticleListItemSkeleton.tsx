import { ArticleView } from 'entities/Article/model/const/article'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { useHover } from 'shared/lib/hooks/useHover'
import { Card } from 'shared/ui/Card/Card'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

import cls from './ArticleListItem.module.scss'

interface ArticleListItemSkeletonProps {
  className?: string

  view: ArticleView
}

export const ArticleListItemSkeleton = memo(
  ({ className, view }: ArticleListItemSkeletonProps) => {
    const [isHovered, bindHover] = useHover()
    const navigate = useNavigate()

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Skeleton height={30} width={30} border={'50%'} />
              <Skeleton height={16} width={150} className={cls.username} />
              <Skeleton height={16} width={150} className={cls.date} />
            </div>
            <Skeleton width={250} height={24} className={cls.title} />

            <Skeleton height={200} className={cls.img} />
            <div className={cls.footer}>
              <Skeleton width={200} height={36} />
            </div>
          </Card>
        </div>
      )
    }

    //SMALL

    return (
      <div
        {...bindHover}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    )
  }
)
