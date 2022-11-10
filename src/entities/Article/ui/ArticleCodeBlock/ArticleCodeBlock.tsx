import { ArticleCodeBlock } from 'entities/Article/model/types/article'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Code } from 'shared/ui/Code/Code'
import cls from './ArticleCodeBlock.module.scss'

interface ArticleCodeBlockProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockProps) => {
    return (
      <div className={classNames(cls.ArticleCodeBlock, {}, [className])}>
        <Code text={block.code} />
      </div>
    )
  }
)
