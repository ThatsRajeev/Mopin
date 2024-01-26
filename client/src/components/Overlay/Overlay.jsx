import React, { useEffect } from "react";
import { useBlocker } from "react-router-dom";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Overlay.css";

const Overlay = ({ isOpen, children, closeOverlay, unsetDims }) => {
  const overlayStyles = unsetDims ? { height: 'unset', width: 'unset' } : {};
  const blocker = useBlocker(() => isOpen);

  useEffect(() => {
    window.addEventListener('popstate', closeOverlay);
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      window.removeEventListener('popstate', closeOverlay);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeOverlay]);

  return ReactDOM.createPortal(
    <div className="overlay-container" onClick={closeOverlay}>
      <div className="overlay-content" style={overlayStyles} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeOverlay}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </div>,
    document.querySelector(".modal")
  );
};

Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};

export default Overlay;
