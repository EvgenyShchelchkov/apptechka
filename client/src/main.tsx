import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App.tsx'
import { store } from './app/lib/store.ts'
import { injectStore } from './shared/api/axiosInstance.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

injectStore(store);
