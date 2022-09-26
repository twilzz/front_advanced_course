import { classNames } from './classNames'

describe('classNames', () => {
  test('test', () => {
    expect(classNames('someCls', {})).toBe('someCls')
  })
  test('test', () => {
    expect(classNames('someCls', {}, ['class 1', 'class 2'])).toBe(
      'someCls class 1 class 2'
    )
  })
  test('test', () => {
    expect(
      classNames('someCls', { hovered: true, scrollable: true }, [
        'class 1',
        'class 2',
      ])
    ).toBe('someCls hovered scrollable class 1 class 2')
  })
})
