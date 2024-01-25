import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Overlay.css";

const Overlay = ({ isOpen, children, closeOverlay }) => {
  useEffect(() => {
    const handlePopstate = () => {
      closeOverlay();
      window.history.pushState(null, "", window.location.href);
    };

    if (isOpen) {
      window.addEventListener("popstate", handlePopstate);
    }

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isOpen, closeOverlay]);

  return (
    <div className={`overlay-container ${isOpen ? 'open' : ''}`} onClick={closeOverlay}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeOverlay}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};

export default Overlay;
