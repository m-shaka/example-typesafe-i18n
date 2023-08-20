import type { Preview } from "@storybook/react";
import { useEffect, useState } from "react";
import { Locales } from "../src/i18n/i18n-types";
import { loadLocaleAsync } from "../src/i18n/i18n-util.async";
import TypesafeI18n from "../src/i18n/i18n-react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'de', title: 'Deutsch'}
        ],
        showName: true,
      },
      defaultValue: 'en'
    },
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals["locale"] as Locales
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
          <Story />
        </TypesafeI18n>)
        : (<>null</>)
    
    }
  ]
};

export default preview;
