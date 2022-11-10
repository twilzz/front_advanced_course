import { ArticleTextBlock } from 'entities/Article/model/types/article'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import cls from './ArticleTextBlock.module.scss'

interface ArticleTextBlockProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockProps) => {
    return (
      <div className={classNames(cls.ArticleCodeBlock, {}, [className])}>
        {block.title && <Text title={block?.title} className={cls.title} />}
        {block.paragraphs.map((paragraph, index) => (
          <Text key={index} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    )
  }
)
