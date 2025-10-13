import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {serviceOptions} from "./api/services/index.defs.ts";
import authInterceptor from "./core/interceptors/auth.interceptor.ts";
import { Provider } from "react-redux";
import {store} from "./stores";

serviceOptions.axios = authInterceptor;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
