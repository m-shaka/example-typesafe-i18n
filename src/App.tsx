import { useI18nContext } from './i18n/i18n-react'
import { useSearchParams } from 'react-router-dom'

function App() {
  const [, setSearchParams] = useSearchParams()
  const {LL, locale } = useI18nContext()
  const handleLangChange = () => {
    if (locale === 'en') {
      setSearchParams({lang: 'de'})
    } else {
      setSearchParams({lang: 'en'})
    }
  }
  return (
    <>
      <button onClick={handleLangChange}>Change Lang</button>
      {LL.hello({name: 'John'})}
    </>
  )
}

export default App
