"use client";
import { useEffect, useState } from "react";
import importHighlightLanguage from "./importHighlightLanguage";
import type { PrismLanguage } from "@lib/data/languageIconAliases";

/**
 * Loads the specified language's highlight syntax, and returns its Refractor name when loaded.
 */
export default function useHighlightLanguage(languageName: string | undefined) {
  const [loadedLang, setLoadedLang] = useState<PrismLanguage>();

  useEffect(() => {
    importHighlightLanguage(languageName).then(lang => setLoadedLang(lang));
  }, [languageName]);

  return loadedLang;
}
