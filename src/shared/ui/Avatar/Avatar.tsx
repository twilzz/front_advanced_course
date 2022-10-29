import { CSSProperties, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({ width: size, height: size }),
    []
  )
  return (
    <img
      src={src}
      style={styles}
      alt={alt}
      className={classNames(cls.Avatar, {}, [className])}
    />
  )
}
