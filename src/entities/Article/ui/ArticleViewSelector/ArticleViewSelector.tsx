import { ArticleView } from 'entities/Article/model/types/article'
import { memo } from 'react'
import ListIcon from 'shared/assets/icons/bi_list.svg'
import TileIcon from 'shared/assets/icons/fe_tiled.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import cls from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  { view: ArticleView.SMALL, icon: ListIcon },
  { view: ArticleView.BIG, icon: TileIcon },
]

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const onClick = (newView: ArticleView) => {
      return () => {
        onViewClick?.(newView)
      }
    }
    return (
      <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              className={classNames('', {
                [cls.notSelected]: viewType.view !== view,
              })}
              Svg={viewType.icon}
            />
          </Button>
        ))}
      </div>
    )
  }
)
