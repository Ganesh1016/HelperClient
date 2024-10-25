import { useState } from "react";
import PropTypes from "prop-types";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`text-3xl ${
            value <= rating ? "text-yellow-500" : "text-gray-300"
          } cursor-pointer`}
          onClick={() => handleClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default StarRating;
