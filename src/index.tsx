import { createRoot } from 'react-dom/client'
import ThemeProvider, { ThemedGlobalStyle } from 'src/theme'

import App from './App'
import { StarknetProvider } from './components/Web3Provider'

const container = document.getElementById('root')
if (!container) throw 'Undefined #root container'

const root = createRoot(container)
root.render(
  <StarknetProvider>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <App />
    </ThemeProvider>
  </StarknetProvider>
)
