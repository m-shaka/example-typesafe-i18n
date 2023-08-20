import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TypesafeI18n from './i18n/i18n-react'
import { loadLocaleAsync } from './i18n/i18n-util.async.ts'
import { Locales } from './i18n/i18n-types.ts'
import { RouterProvider, createBrowserRouter, useSearchParams } from 'react-router-dom'


const Main = () => {
  const [searchParams] = useSearchParams()
  const locale = searchParams.get('lang') as Locales ?? 'en'
  const [localesLoaded, setLocalesLoaded] = useState<Record<Locales, boolean>>({en: false, de: false})
  useEffect(() => {
    loadLocaleAsync(locale).then(
      () => setLocalesLoaded(
        (localesLoaded) => ({ ...localesLoaded, [locale]: true })
        )
    )
  }, [locale])
  return localesLoaded[locale]
    ? (<TypesafeI18n locale={locale}>
      <App />
    </TypesafeI18n>)
    : null
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
