import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailedPage.module.scss'

interface ArticleDetailedPageProps {
  className?: string
}

const ArticleDetailedPage = (props: ArticleDetailedPageProps) => {
  const {className} = props
  const { t } = useTranslation()
  return <div className={classNames(cls.ArticleDetailedPage, {}, [className])}>
    ARTICLE DETAILS
  </div>
}

export default memo(ArticleDetailedPage)
