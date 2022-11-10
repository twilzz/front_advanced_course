import { ArticleImageBlock } from 'entities/Article/model/types/article'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import cls from './ArticleImageBlock.module.scss'

interface ArticleImageBlockProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockProps) => {
    return (
      <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
        <img src={block.src} className={cls.img} alt={block.title} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    )
  }
)
