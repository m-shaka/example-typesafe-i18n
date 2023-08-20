// import the original type declarations
import "i18next";
import type { Locale } from '../locales/en';

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: Locale;
    // other
  }
}
