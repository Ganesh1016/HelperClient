import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-body min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-darkPrimary mb-4">
          {t("contact-us-header")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-tertiary p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-darkPrimary mb-4">
              {t("email-heading")}
            </h2>
            <p className="text-lg text-lightText">
              {t("contact-email-text")}{" "}
              <a href="mailto:ganeshgajelly.dev@gmail.com">
                {" "}
                {/* Replace with actual email address */}
                {t("contact-email")}
              </a>
            </p>
          </div>
          <div className="bg-tertiary p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-darkPrimary mb-4">
              {t("phone-number-heading")}
            </h2>
            <p className="text-lg text-lightText">
              {t("reach-out-text")} {t("phone-number")}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-darkPrimary mb-4">
            {t("when-to-contact-us")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-xl font-bold text-darkPrimary mb-4">
                {t("contact-disputes")}
              </h3>
              <p className="text-lg text-lightText">
                {t("contact-disputes-text")}
              </p>
            </div>
            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-xl font-bold text-darkPrimary mb-4">
                {t("technical-issues")}
              </h3>
              <p className="text-lg text-lightText">
                {t("technical-issues-text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
