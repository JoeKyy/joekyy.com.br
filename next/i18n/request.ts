import { getRequestConfig } from "next-intl/server";
import { Locale, hasLocale } from "next-intl";

export const locales = ["pt-br", "en-us"] as const;
export const defaultLocale = "pt-br";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`@/data/${locale}.json`)).default,
  };
});
