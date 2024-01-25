import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Overlay.css";

const Overlay = ({ isOpen, children, closeOverlay, unsetDims }) => {
  const overlayStyles = unsetDims ? { height: 'unset', width: 'unset' } : {};

  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const previousHistoryState = window.history.state;
      window.history.pushState(null, null, window.location.href);
      window.history.replaceState(previousHistoryState, null, window.location.href);
    }
  }, [closeOverlay]);

  window.addEventListener('popstate', () => {
    if(isOpen) {
      closeOverlay();
    }
  });

  return ReactDOM.createPortal(
    <div className={`overlay-container ${isOpen ? 'open' : ''}`} onClick={closeOverlay}>
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
