import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export const Card = memo(({ className, children, ...other }: CardProps) => {
  return (
    <div className={classNames(cls.Card, {}, [className])} {...other}>
      {children}
    </div>
  )
})
