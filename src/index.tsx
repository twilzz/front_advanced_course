import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'
import { BrowserRouter } from 'react-router-dom'
import 'shared/config/i18n/i18n'
import App from './app/App'
import { ThemeProvider } from './app/providers/ThemeProvider/ui/ThemeProvider'
import './app/styles/index.scss'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
if (!container) {
  throw new Error('Container not found')
}
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)
