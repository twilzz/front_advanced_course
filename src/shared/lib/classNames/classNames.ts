export type Mods = Record<string, boolean | string | undefined>
export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...Object.entries(mods)
      ?.filter(([classNames, value]) => Boolean(value))
      ?.map(([classNames]) => classNames),
    ...additional?.filter(Boolean),
  ]?.join(' ')
}
