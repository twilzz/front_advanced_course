import { memo, SVGProps, VFC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps {
  className?: string
  Svg: VFC<SVGProps<SVGElement>>
}

export const Icon = memo(({ className, Svg }: IconProps) => {
  return <Svg className={classNames(cls.Icon, {}, [className])} />
})
