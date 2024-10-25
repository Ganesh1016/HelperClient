import "../index.css";

const BusinessPolicy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-heading">Terms and Conditions</h1>
      <p className="last-updated">Last updated on February 26, 2024</p>

      <div className="grid-container">
        {/* Introduction */}
        <div className="grid-item">
          <h2 className="section-heading">1. Introduction</h2>
          <p>
            Welcome to <strong>Helper.com</strong>! These terms and conditions
            govern your use of our website and services. By accessing or using
            Helper.com, you agree to comply with and be bound by these terms and
            conditions. If you disagree with any part of these terms, please do
            not use our website or services.
          </p>
        </div>

        {/* Definitions */}
        <div className="grid-item">
          <h2 className="section-heading">2. Definitions</h2>
          <ul>
            <li>
              <strong>Helper.com</strong>: Refers to Ganesh Waman Gajelly, the
              owner of Helper.com.
            </li>
            <li>
              <strong>You</strong>: Refers to any natural or legal person who
              accesses or uses Helper.com.
            </li>
          </ul>
        </div>

        {/* User Conduct */}
        <div className="grid-item">
          <h2 className="section-heading">3. User Conduct</h2>
          <p>
            You agree to use Helper.com responsibly and lawfully. This includes
            refraining from:
          </p>
          <ul>
            <li>Violating any applicable laws or regulations.</li>
            <li>Engaging in fraudulent or deceptive behavior.</li>
            <li>Harassing, threatening, or harming others.</li>
            <li>
              Uploading or sharing any content that is unlawful, defamatory, or
              infringes upon the rights of others.
            </li>
          </ul>
        </div>

        {/* Account Registration */}
        <div className="grid-item">
          <h2 className="section-heading">4. Account Registration</h2>
          <p>
            To access certain features of Helper.com, you may need to register
            for an account.
          </p>
        </div>

        {/* Refund Policy */}
        <div className="grid-item">
          <h2 className="section-heading">Refund Policy</h2>
          <p>
            <a
              className="razorpay"
              href="https://merchant.razorpay.com/policy/NfNF19RbHLPJ31/refund"
            >
              Cancellation and Refund
            </a>
          </p>
          <p>No cancellations & Refunds are entertained.</p>
        </div>

        {/* Shipping Details */}
        <div className="grid-item">
          <h2 className="section-heading">Shipping Details</h2>
          <p>
            <a
              className="razorpay"
              href="https://merchant.razorpay.com/policy/NfNF19RbHLPJ31/shipping"
            >
              Shipping and Delivery
            </a>
          </p>
          <p>Shipping is not applicable for business.</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPolicy;
