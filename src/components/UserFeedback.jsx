import PropTypes from "prop-types";

const UserFeedback = ({ feedback }) => {
  return (
    <div
      className="review-card w-96 h-[98%] rounded-lg m-2 p-2 font-poppins flex flex-col justify-evenly"
      style={{ border: "2px solid black" }}
    >
      <div className="feedback-header flex flex-row items-center justify-between px-2">
        <p>{"⭐".repeat(feedback.ratings)}</p>
        <p>{new Date(feedback.feedbackDate).toLocaleDateString()}</p>
      </div>
      <div className="feedback-body text-sm">{feedback.reviews}</div>
      <div className="feedback-footer flex flex-row justify-start items-center">
        <img
          src={feedback.seekerId.profilePicture}
          alt="user-profile"
          className=" w-9 h-9 rounded-full"
        />
        <p className=" ml-3">{feedback.seekerId.fullname}</p>
      </div>
    </div>
  );
};

UserFeedback.propTypes = {
  feedback: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    reviews: PropTypes.string.isRequired,
    ratings: PropTypes.number.isRequired,
    feedbackDate: PropTypes.string.isRequired,
    seekerId: PropTypes.shape({
      profilePicture: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserFeedback;
