import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-body min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-darkPrimary mb-4">
          {t("about-header")}
        </h1>
        <p className="text-lg text-lightText mb-6">{t("about-description")}</p>
        <h2 className="text-2xl font-bold text-darkPrimary mb-4">
          {t("mission-header")}
        </h2>
        <p className="text-lg text-lightText mb-6">
          {t("mission-description")}
        </p>
        <h2 className="text-2xl font-bold text-darkPrimary mb-4">
          {t("vision-header")}
        </h2>
        <p className="text-lg text-lightText mb-6">{t("vision-description")}</p>
      </div>
    </div>
  );
};

export default About;
