import { I18n } from 'i18n-js';
import en from '@/languages/en.json';
import hi from '@/languages/hi.json';
import { useLittleMachine } from '@/lib';

export const useTranslate = () => {
  const { state } = useLittleMachine();
  const translations = { en, hi };
  const i18n: I18n = new I18n(translations);
  // @ts-ignore
  i18n.locale = state.language || 'en';

  i18n.defaultLocale = 'hi';

  // return i18n as I18n & {
  //   t: (key: keyof typeof en | keyof typeof hi, options?: any) => string;
  // };
  return { i18n } as {
    i18n: I18n & {
      t: (key: keyof typeof en | keyof typeof hi, options?: any) => string;
    };
  };
};
