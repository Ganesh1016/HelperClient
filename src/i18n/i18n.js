import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "mr", "te"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      // loadPath: "http://localhost:3000/api/translate?language={{lng}}",
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });
