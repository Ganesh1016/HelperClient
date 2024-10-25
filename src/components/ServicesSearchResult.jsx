import PropTypes from "prop-types";

const ServicesSearchResult = ({ provider }) => {
  const {
    fullname,
    email,
    age,
    gender,
    homeAddress,
    profilePicture,
    serviceCategory,
    availability,
    hourlyRate,
    workExperience,
    phoneNumber,
  } = provider;

  return (
    <div className="search-result flex items-center justify-evenly w-[99.5%] h-[200px] border border-[#525151b1] rounded-xl bg-[#fff] m-1 p-2">
      <div className="user flex items-center ml-0 w-[30%]">
        <img
          src={profilePicture}
          alt="User profile"
          className="w-14 h-14 border rounded-full mr-2"
        />
        <div className="user-details pl-0 ml-3">
          <h5 className=" text-xl">
            <b>{fullname}</b>
          </h5>
          <p className=" text-sm">{serviceCategory}</p>
        </div>
      </div>
      <div className="ratings flex items-center">⭐⭐⭐⭐⭐</div>
      <div className="service-pricing flex items-center bg-[#E7E6FE] p-2 w-fit px-3 rounded-3xl text-base text-primary">
        Rs. {hourlyRate} per Hour
      </div>
      <div className="contact-user flex items-center justify-evenly w-[20%]">
        <button className=" w-fit p-3 rounded-3xl flex flex-row justify-between items-center border border-[#000] bg-[#F4F5F4] text-[#787878]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className=" mr-3"
          >
            <path
              d="M8.15635 9C8.15635 9.22378 8.24524 9.43839 8.40348 9.59662C8.56171 9.75486 8.77632 9.84375 9.0001 9.84375C9.22387 9.84375 9.43849 9.75486 9.59672 9.59662C9.75495 9.43839 9.84385 9.22378 9.84385 9C9.84385 8.77622 9.75495 8.56161 9.59672 8.40338C9.43849 8.24514 9.22387 8.15625 9.0001 8.15625C8.77632 8.15625 8.56171 8.24514 8.40348 8.40338C8.24524 8.56161 8.15635 8.77622 8.15635 9ZM11.672 9C11.672 9.22378 11.7609 9.43839 11.9191 9.59662C12.0773 9.75486 12.2919 9.84375 12.5157 9.84375C12.7395 9.84375 12.9541 9.75486 13.1123 9.59662C13.2706 9.43839 13.3595 9.22378 13.3595 9C13.3595 8.77622 13.2706 8.56161 13.1123 8.40338C12.9541 8.24514 12.7395 8.15625 12.5157 8.15625C12.2919 8.15625 12.0773 8.24514 11.9191 8.40338C11.7609 8.56161 11.672 8.77622 11.672 9ZM4.64072 9C4.64072 9.22378 4.72962 9.43839 4.88785 9.59662C5.04609 9.75486 5.2607 9.84375 5.48447 9.84375C5.70825 9.84375 5.92286 9.75486 6.0811 9.59662C6.23933 9.43839 6.32822 9.22378 6.32822 9C6.32822 8.77622 6.23933 8.56161 6.0811 8.40338C5.92286 8.24514 5.70825 8.15625 5.48447 8.15625C5.2607 8.15625 5.04609 8.24514 4.88785 8.40338C4.72962 8.56161 4.64072 8.77622 4.64072 9ZM16.2634 5.94844C15.8661 5.00449 15.2966 4.15723 14.5706 3.42949C13.8497 2.70597 12.9939 2.13086 12.0517 1.73672C11.0849 1.33066 10.0583 1.125 9.0001 1.125H8.96494C7.89971 1.13027 6.86787 1.34121 5.89756 1.75605C4.96338 2.15424 4.1156 2.73037 3.40147 3.45234C2.68252 4.17832 2.11826 5.02207 1.72803 5.9625C1.32373 6.93633 1.11983 7.97168 1.1251 9.03691C1.13106 10.2577 1.41987 11.4604 1.96885 12.5508V15.2227C1.96885 15.4371 2.05404 15.6428 2.20568 15.7944C2.35732 15.9461 2.56299 16.0312 2.77744 16.0312H5.45108C6.54144 16.5802 7.74419 16.869 8.96494 16.875H9.00186C10.0548 16.875 11.0761 16.6711 12.0376 16.2721C12.9751 15.8826 13.8277 15.3142 14.5478 14.5986C15.2737 13.8797 15.845 13.0395 16.244 12.1025C16.6589 11.1322 16.8698 10.1004 16.8751 9.03516C16.8804 7.96465 16.6729 6.92578 16.2634 5.94844ZM13.6073 13.6477C12.3751 14.8676 10.7403 15.5391 9.0001 15.5391H8.97022C7.91025 15.5338 6.85733 15.2701 5.92744 14.7744L5.77979 14.6953H3.30479V12.2203L3.22569 12.0727C2.72998 11.1428 2.46631 10.0898 2.46104 9.02988C2.45401 7.27734 3.12373 5.63203 4.35244 4.39277C5.5794 3.15352 7.21943 2.46797 8.97197 2.46094H9.00186C9.88076 2.46094 10.7333 2.63145 11.5366 2.96895C12.3206 3.29766 13.0237 3.77051 13.6284 4.3752C14.2313 4.97812 14.706 5.68301 15.0347 6.46699C15.3757 7.2791 15.5462 8.14043 15.5427 9.02988C15.5321 10.7807 14.8448 12.4207 13.6073 13.6477Z"
              fill="#787878"
            />
          </svg>{" "}
          Message
        </button>
        <button className=" bg-primary p-3 rounded-3xl text-body w-fit flex flex-row justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className=" mr-3"
          >
            <path
              d="M5.82993 1.82935L6.63768 1.57135C7.39368 1.32985 8.20218 1.7206 8.52618 2.4841L9.17119 4.0051C9.45244 4.66735 9.29643 5.4466 8.78569 5.9311L7.36593 7.2796C7.45368 8.0866 7.72444 8.88085 8.17894 9.66235C8.61081 10.4185 9.18998 11.0803 9.88218 11.6086L11.5892 11.0386C12.2357 10.8234 12.9399 11.0716 13.3367 11.6544L14.2607 13.0119C14.7227 13.6899 14.6394 14.6243 14.0672 15.1988L13.4537 15.8146C12.8432 16.4274 11.9717 16.6501 11.1647 16.3981C9.26043 15.8041 7.50993 14.0409 5.91243 11.1084C4.31269 8.17135 3.74869 5.67835 4.21894 3.63235C4.41694 2.77135 5.03044 2.0851 5.83144 1.82935H5.82993Z"
              fill="white"
            />
          </svg>
          Call
        </button>
      </div>
    </div>
  );
};

ServicesSearchResult.propTypes = {
  provider: PropTypes.object.isRequired,
};

export default ServicesSearchResult;
