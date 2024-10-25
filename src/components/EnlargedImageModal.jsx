import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import anime from "animejs/lib/anime.es.js";
import "../index.css";

const EnlargedImageModal = ({ imageUrl, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;

    // Animate modal entrance
    anime({
      targets: modal,
      opacity: [0, 1],
      duration: 300,
      easing: "easeInOutQuad",
      begin: () => {
        modal.style.display = "flex";
      },
    });

    // Animate modal content entrance
    anime({
      targets: modal.querySelector(".modal-content"),
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 300,
      easing: "easeInOutQuad",
    });

    // Clear the timeout variable when component unmounts
    let timeoutId;

    const handleAnimationComplete = () => {
      // Clear the timeout to prevent automatic closing
      clearTimeout(timeoutId);
    };

    // Set a timeout to close the modal after a delay (e.g., 5 minutes)
    timeoutId = setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.style.display = "none";
        onClose();
      }
    }, 5 * 60 * 1000); // Close the modal after 5 minutes (adjust as needed)

    return () => {
      // Clear the timeout when the component unmounts or cleanup is needed
      clearTimeout(timeoutId);

      // Animate modal exit
      anime({
        targets: modal,
        opacity: [1, 0],
        duration: 300,
        easing: "easeInOutQuad",
        complete: handleAnimationComplete,
      });
    };
  }, [onClose]);

  return (
    <div ref={modalRef} className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Enlarged Profile" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

EnlargedImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EnlargedImageModal;
