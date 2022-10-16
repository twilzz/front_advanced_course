import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from 'shared/config/tests/componentRender/componentRender'
import { Counter } from './Counter'

describe('Counter', () => {
  test('Sidebar test', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } })
    expect(screen.getByTestId('value-title')).toHaveTextContent('10')
  })
  test('Increment', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } })
    fireEvent.click(screen.getByTestId('increment-button'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('11')
  })
  test('Decrement', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } })
    fireEvent.click(screen.getByTestId('decriment-button'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('9')
  })
})
