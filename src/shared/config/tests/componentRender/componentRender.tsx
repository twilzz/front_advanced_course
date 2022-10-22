import { render } from '@testing-library/react'
import {
  createReduxStore,
  StateSchema,
  StoreProvider,
} from 'app/providers/StoreProvider'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18nForTests from 'shared/config/i18n/i18nForTests'

export interface componentRenderRouterOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

export function componentRender(
  component: ReactNode,
  options: componentRenderRouterOptions = {}
) {
  const { route = '/', initialState } = options
  const store = createReduxStore(initialState as StateSchema)
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}
