import { findPrismLanguage } from "@lib/data/languageIconAliases";
import { refractor } from "refractor";

export default async function importHighlightLanguage(languageName: string | undefined) {
  const lang = findPrismLanguage(languageName);

  try {
    if (lang && !refractor.registered(lang)) {
      refractor.register((await import(`refractor/lang/${lang}.js`)).default);
    }
    return lang;
  } catch {
    console.error(`"${lang}" is not a valid Refractor/PrismJS language.`);
  }
}
