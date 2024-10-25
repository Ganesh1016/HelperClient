import PropTypes from "prop-types";

const TestimonialsCard = ({ avatar, name, comment }) => {
  return (
    <div className="bg-tertiary rounded-lg p-6">
      <img
        src={avatar}
        alt="Avatar"
        className="w-16 h-16 rounded-full mx-auto mb-4"
      />
      <h2 className="text-lg font-semibold text-darkPrimary mb-2">{name}</h2>
      <p className="text-lightText">{comment}</p>
    </div>
  );
};

TestimonialsCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default TestimonialsCard;
