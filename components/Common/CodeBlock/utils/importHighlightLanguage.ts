import { findPrismLanguage } from "@lib/data/languageIconAliases";
import { refractor } from "refractor";

export default async function importHighlightLanguage(languageName: string | undefined) {
  if (languageName) {
    const lang = findPrismLanguage(languageName);
    if (lang) {
      try {
        refractor.register((await import(`refractor/lang/${lang}.js`)).default);
        return lang;
      } catch {
        console.error(`"${lang}" is not a valid Refractor/PrismJS language.`);
      }
    }
  }
}
