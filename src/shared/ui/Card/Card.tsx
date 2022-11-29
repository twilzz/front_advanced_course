import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}

export const Card = memo(
  ({ className, children, theme = CardTheme.NORMAL, ...other }: CardProps) => {
    return (
      <div
        className={classNames(cls.Card, {}, [className, cls[theme]])}
        {...other}
      >
        {children}
      </div>
    )
  }
)
