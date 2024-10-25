import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-body min-h-screen">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-darkPrimary mb-8">
          {t("pricing-header")}
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="bg-tertiary p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-darkPrimary mb-4">
              {t("service-seeker-plan")}
            </h2>
            <p className="text-lg text-lightText">{t("pricing-description")}</p>
            <ul className="list-disc list-inside text-lg text-lightText ml-4">
              <li>{t("pricing-point")}</li>
            </ul>
          </div>
          <p className="text-lg text-lightText">{t("pricing-plan-avail")}</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
