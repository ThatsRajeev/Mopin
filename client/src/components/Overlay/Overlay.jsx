import React from "react";
import PropTypes from "prop-types";
import "./Overlay.css";

const Overlay = ({ children, closeOverlay, unsetDims }) => {
  const overlayStyles = unsetDims ? { height: 'unset', width: 'unset' } : {};

  return (
    <div className="overlay-container" onClick={closeOverlay}>
      <div className="overlay-content" style={overlayStyles} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeOverlay}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};

export default Overlay;
