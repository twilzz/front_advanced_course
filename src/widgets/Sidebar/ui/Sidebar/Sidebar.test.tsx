import { fireEvent, render, screen } from '@testing-library/react'
import { withTranslation } from 'react-i18next'
import { componentRender } from 'shared/config/tests/componentRender/componentRender'
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('Sidebar test', () => {
    componentRender(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
  test('Sidebar toggle test', () => {
    componentRender(<Sidebar />)
    const toggleButton = screen.getByTestId('sidebar-toggle')
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
