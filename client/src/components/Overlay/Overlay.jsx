import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Overlay.css";

const Overlay = ({ children, unsetDims }) => {
  const navigate = useNavigate();

  const closeOverlay = () => {
    navigate(-1);
  };

  const overlayStyles = unsetDims ? { height: 'unset', width: 'unset' } : {};

  return (
    <div className="overlay-container" onClick={closeOverlay}>
      <div className="overlay-content" style={overlayStyles} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  unsetDims: PropTypes.bool,
};

export default Overlay;
