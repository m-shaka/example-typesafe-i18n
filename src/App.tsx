import { useI18nContext } from './i18n/i18n-react'

function App() {
  const { LL } = useI18nContext()
  return (
    <>
      {LL.hello({name: 'John'})}
    </>
  )
}

export default App
